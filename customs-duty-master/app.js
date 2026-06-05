const FIELDS = [
  { key: "time", short: "時期", label: "課税物件の確定時期", tone: "time", principle: "輸入申告の時" },
  { key: "law", short: "法令", label: "適用法令", tone: "law", principle: "輸入申告の日" },
  { key: "taxpayer", short: "義務者", label: "納税義務者", tone: "taxpayer", principle: "輸入者" }
];

const STUDY_ITEMS = [
  {
    id: "principle",
    group: "原則",
    title: "原則",
    source: "S__109862923_0.jpg",
    time: "輸入申告の時",
    law: "輸入申告の日",
    taxpayer: "輸入者",
    diff: [],
    rule: "通常の輸入では、輸入申告が3列すべての基準になる。",
    example: "海外から部品を仕入れ、通常どおり輸入申告をして許可を受ける。",
    memory: "最初の土台は「申告の時・申告の日・輸入者」。迷ったらここへ戻る。"
  },
  {
    id: "bonded-loss",
    group: "保税地域の事故・許可",
    title: "保税地域等において亡失・滅却",
    source: "S__109862923_0.jpg",
    time: "亡失・滅却の時",
    law: "亡失・滅却の日",
    taxpayer: "保税地域等の許可を受けた者（指定保税地域では外国貨物を管理する者）",
    diff: ["time", "law", "taxpayer"],
    rule: "保税地域内で貨物がなくなったり滅却されたりした場合は、その事故発生時点で見る。",
    example: "保税蔵置場に置いた外国貨物が火災で滅却した。",
    memory: "事故は「起きた時・起きた日」。責任は保税地域側に寄る。"
  },
  {
    id: "outside-work",
    group: "保税地域の事故・許可",
    title: "保税地域外で使用・作業する許可",
    source: "S__109862923_0.jpg",
    time: "当該許可がされた時",
    law: "当該許可がされた日",
    taxpayer: "当該許可を受けた者",
    diff: ["time", "law", "taxpayer"],
    rule: "保税地域外へ出して使用または作業する特別な許可では、許可が基準になる。",
    example: "外国貨物を保税地域外の工場へ出して、試験作業をする許可を受けた。",
    memory: "外で使うなら「外へ出す許可」が3列の軸。"
  },
  {
    id: "individual-transport",
    group: "保税運送の未到着",
    title: "個別保税運送で期間内に到着しない貨物",
    source: "S__109862923_0.jpg",
    time: "当該承認がされた時",
    law: "当該承認がされた日",
    taxpayer: "運送の承認を受けた者",
    diff: ["time", "law", "taxpayer"],
    rule: "個別承認を受けた保税運送貨物が期間内に到着しない場合は、個別承認が基準になる。",
    example: "A保税蔵置場からB保税蔵置場へ個別承認で運送した貨物が、期限までに到着しない。",
    memory: "個別は「承認時」。未到着でも、出発ではなく承認を見る。"
  },
  {
    id: "blanket-transport",
    group: "保税運送の未到着",
    title: "包括保税運送で期間内に到着しない貨物",
    source: "S__109862923_0.jpg",
    time: "当該承認に係る外国貨物が発送された時",
    law: "当該承認に係る外国貨物が発送された日",
    taxpayer: "運送の承認を受けた者",
    diff: ["time", "law", "taxpayer"],
    rule: "包括承認では個々の発送が基準になる。期間内に到着しないと、発送時点で見る。",
    example: "包括承認のもとで複数回発送したうち、ある外国貨物だけが到着期限に遅れた。",
    memory: "包括はまとめ承認なので、個別の動きは「発送」で捕まえる。"
  },
  {
    id: "specified-transport",
    group: "保税運送の未到着",
    title: "特定保税運送で発送翌日から7日以内に到着しない貨物",
    source: "S__109862923_0.jpg",
    time: "当該外国貨物が発送された時",
    law: "当該外国貨物が発送された日",
    taxpayer: "特定保税運送者",
    diff: ["time", "law", "taxpayer"],
    rule: "特定保税運送では、発送翌日から7日以内に到着しないと発送が基準になる。",
    example: "特定保税運送者が発送した外国貨物が、発送日の翌日から7日以内に到着しなかった。",
    memory: "特定は「7日」と「特定保税運送者」をセットで記憶。"
  },
  {
    id: "postal-transport",
    group: "保税運送の未到着",
    title: "届出により保税運送された郵便物が7日以内に到着しない",
    source: "S__109862923_0.jpg",
    time: "当該郵便物が発送された時",
    law: "当該郵便物が発送された日",
    taxpayer: "届出をした者",
    diff: ["time", "law", "taxpayer"],
    rule: "届出による郵便物の保税運送も、発送翌日から7日以内に到着しないと発送が基準になる。",
    example: "届出で保税運送された郵便物が、期限内に到着しなかった。",
    memory: "郵便物は「郵便物が発送」、義務者は「届出をした者」。"
  },
  {
    id: "ship-aircraft-supplies",
    group: "船機用品・保税展示",
    title: "船用品・機用品の積込承認",
    source: "S__109862923_0.jpg",
    time: "積込みの承認がされた時",
    law: "積込みの承認がされた日",
    taxpayer: "積込みの承認を受けた者",
    diff: ["time", "law", "taxpayer"],
    rule: "船用品・機用品として積み込む承認を受けた貨物は、積込承認が基準になる。",
    example: "外国貨物を航空機用品として積み込む承認を受けた。",
    memory: "積込承認はそのまま「積込みの承認」。一括承認は次のカードで別に覚える。"
  },
  {
    id: "bulk-loading",
    group: "船機用品・保税展示",
    title: "船用品・機用品の一括積込承認",
    source: "S__109862923_0.jpg",
    time: "当該承認に係る外国貨物が保税地域から引き取られた時",
    law: "当該承認に係る外国貨物が保税地域から引き取られた日",
    taxpayer: "積込みの承認を受けた者",
    diff: ["time", "law", "taxpayer"],
    rule: "一括して積込みの承認を受けた場合は、承認時ではなく保税地域からの引取りが基準になる。",
    example: "複数回分の船用品について一括積込承認を受け、その一部を保税地域から引き取った。",
    memory: "一括は「まとめて承認」なので、実際に引き取った時点で確定。"
  },
  {
    id: "exhibition-timeout",
    group: "船機用品・保税展示",
    title: "保税展示場の搬出期間満了後",
    source: "S__109862923_0.jpg",
    time: "関税を徴収すべき事由が生じた時",
    law: "関税を徴収すべき事由が生じた日",
    taxpayer: "保税展示場の許可を受けた者",
    diff: ["time", "law", "taxpayer"],
    rule: "搬出期間満了後は、関税を徴収すべき事由が生じた時点で捕まえる。",
    example: "保税展示場に入れた外国貨物を、搬出期間満了後も適切に搬出しなかった。",
    memory: "展示場の期間切れは「徴収事由」。義務者は展示場の許可者。"
  },
  {
    id: "specified-mail",
    group: "郵便・特殊輸入",
    title: "特定郵便物",
    source: "S__109862924_0.jpg",
    time: "税関長に提示された時",
    law: "税関長に提示された日",
    taxpayer: "輸入者",
    diff: ["time", "law"],
    rule: "特定郵便物は、税関長への提示が物と法令の基準になる。",
    example: "国際郵便物が特定郵便物として税関長に提示された。",
    memory: "郵便の特定は「提示」。義務者は原則どおり輸入者。"
  },
  {
    id: "auction-sale",
    group: "郵便・特殊輸入",
    title: "公売・随意契約により売却された貨物",
    source: "S__109862924_0.jpg",
    time: "公売・売却の時",
    law: "公売・売却の日",
    taxpayer: "輸入者",
    diff: ["time", "law"],
    rule: "公売または随意契約で売却された貨物は、売却の時点で課税物件が確定する。",
    example: "保管されていた外国貨物が公売に付され、落札された。",
    memory: "売られた貨物は「売却」で時期と法令が決まる。"
  },
  {
    id: "no-permit-import",
    group: "郵便・特殊輸入",
    title: "輸入許可を受けずに輸入された貨物",
    source: "S__109862924_0.jpg",
    time: "輸入の時",
    law: "輸入の日",
    taxpayer: "輸入者",
    diff: ["time", "law"],
    rule: "輸入許可を受けずに輸入された場合は、実際の輸入時点で見る。",
    example: "必要な輸入許可を受けないまま、外国貨物を国内へ持ち込んだ。",
    memory: "無許可は申告を待てない。実際の「輸入」で決める。"
  },
  {
    id: "japan-post-no-presentation",
    group: "郵便・特殊輸入",
    title: "日本郵便株式会社から提示されずに輸入された貨物",
    source: "S__109862924_0.jpg",
    time: "輸入の時",
    law: "輸入の日",
    taxpayer: "輸入者",
    diff: ["time", "law"],
    rule: "日本郵便株式会社から税関への提示がされないまま輸入された貨物も、輸入時点で見る。",
    example: "郵便物が税関長へ提示されず、そのまま輸入された。",
    memory: "提示なし郵便は「提示」ではなく「輸入」。"
  },
  {
    id: "special-importer",
    group: "郵便・特殊輸入",
    title: "特例輸入者・特例委託輸入者の申告で輸入許可を受けた貨物",
    source: "S__109862924_0.jpg",
    time: "輸入許可の時",
    law: "輸入許可の日",
    taxpayer: "輸入者",
    diff: ["time", "law"],
    rule: "特例輸入者または特例委託輸入者による申告では、輸入許可が基準になる。",
    example: "特例輸入者が特例申告により貨物の輸入許可を受けた。",
    memory: "特例は申告より後ろの「許可」で確定。"
  },
  {
    id: "sales-goods-exhibition",
    group: "展示・総保の販売用貨物",
    title: "保税展示場・総合保税地域における販売用貨物等",
    source: "S__109862925_0.jpg",
    time: "展示等の承認・総合保税地域に入れる届出がされた時",
    law: "輸入申告の日",
    taxpayer: "輸入者",
    diff: ["time"],
    rule: "販売または消費を目的とする外国貨物等は、課税物件の確定時期だけが前倒しになる。",
    example: "保税展示場で販売する目的の外国貨物について、展示場に入れる承認を受けた。",
    memory: "この行は「時期だけ例外」。法令と義務者は原則に戻る。"
  },
  {
    id: "long-term-storage",
    group: "長期蔵置・保税作業",
    title: "蔵入承認・総保入承認を受けた長期蔵置貨物",
    source: "S__109862926_0.jpg",
    time: "蔵入承認・総保入承認がされた時（一定のアルコールは輸入申告の時）",
    law: "輸入申告の日（申告後・許可前に改正があれば輸入許可の日。申告後・輸入許可前引取承認前に改正があれば当該承認の日）",
    taxpayer: "輸入者",
    diff: ["time", "law"],
    rule: "長期蔵置貨物は承認時が確定時期。適用法令は原則が輸入申告日だが、法改正のタイミングで例外がある。",
    example: "蔵入承認を受けて長期蔵置していた外国貨物について、後日輸入申告をした。",
    memory: "長期蔵置は「承認で物が固まる」。法令は改正タイミングの2条件を別枠で確認。"
  },
  {
    id: "bonded-manufacturing-product",
    group: "長期蔵置・保税作業",
    title: "移入承認・総保入承認を受けて製造された保税作業による製品",
    source: "S__109862926_0.jpg",
    time: "移入承認・総保入承認がされた時",
    law: "輸入申告の日（申告後・許可前に改正があれば輸入許可の日。申告後・輸入許可前引取承認前に改正があれば当該承認の日）",
    taxpayer: "輸入者",
    diff: ["time", "law"],
    rule: "保税作業で製造された製品は、移入承認または総保入承認が確定時期になる。",
    example: "保税工場で外国原料から製造した製品について、移入承認を受けていた。",
    memory: "製品は「移入・総保入承認」で物が決まる。法令の例外条件は長期蔵置と同じ。"
  }
];

const EXTRA_QUESTIONS = [
  {
    id: "extra-sales-only-time",
    prompt: "保税展示場・総合保税地域における販売用貨物等で、例外になる列はどれか。",
    hint: "画像3枚目の見出しは「課税物件確定時期のみ例外1パターン」。",
    correct: "課税物件の確定時期だけ",
    options: ["課税物件の確定時期だけ", "適用法令だけ", "納税義務者だけ", "3列すべて"],
    explanation: "適用法令は輸入申告の日、納税義務者は輸入者なので、例外は確定時期だけ。"
  },
  {
    id: "extra-withdraw-before-approval",
    prompt: "輸入申告後、輸入許可前引取承認前に法令改正があった場合、適用法令はどの日か。",
    hint: "貨物を引き取るまでの一連の手続の中で、引取承認が現行法令の基準になる。",
    correct: "当該承認の日",
    options: ["当該承認の日", "輸入申告の日", "輸入許可の日", "蔵入承認の日"],
    explanation: "輸入許可前引取承認前の改正なら、当該引取承認の日の法令を適用する。"
  },
  {
    id: "extra-after-withdraw-approval",
    prompt: "輸入許可前引取承認後、輸入許可前に法令改正があった場合、適用法令はどの日か。",
    hint: "画像4枚目のなお書きで、原則どおりとされている。",
    correct: "輸入申告の日",
    options: ["輸入申告の日", "輸入許可の日", "当該承認の日", "法令改正の日"],
    explanation: "引取承認後の法改正は、原則どおり輸入申告の日の法令が適用される。"
  },
  {
    id: "extra-ordinance-goods",
    prompt: "販売用貨物等の「その他政令で定めるもの」に含まれるものとして正しい組み合わせはどれか。",
    hint: "画像3枚目の注記に3つ列挙されている。",
    correct: "有償で観覧・使用に供される貨物、施設の建設・撤去用の機械等、これらに類する貨物",
    options: [
      "有償で観覧・使用に供される貨物、施設の建設・撤去用の機械等、これらに類する貨物",
      "輸出許可を受けた貨物、積戻し貨物、内国貨物",
      "無償サンプル、旅具通関貨物、携帯品",
      "保税運送中の郵便物、特定保税運送貨物、船用品"
    ],
    explanation: "政令事項は、観覧・使用に供される貨物、施設建設・撤去用の機械等、類似貨物。"
  }
];

const STORAGE_KEY = "customs-duty-master-v1";
const GROUPS = [...new Set(STUDY_ITEMS.map((item) => item.group))];
const FIELD_MAP = Object.fromEntries(FIELDS.map((field) => [field.key, field]));

let appState = loadState();
let currentTab = "overview";
let onlyWeak = false;
let flashIndex = 0;
let flashFlipped = false;
let currentQuiz = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      return {
        fields: saved.fields || {},
        cards: saved.cards || {}
      };
    }
  } catch (error) {
    console.warn("Could not load progress", error);
  }
  return { fields: {}, cards: {} };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shuffle(values) {
  return [...values].sort(() => Math.random() - 0.5);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function fieldStatus(itemId, fieldKey) {
  return appState.fields[itemId]?.[fieldKey] || "new";
}

function setFieldStatus(itemId, fieldKey, status) {
  appState.fields[itemId] = appState.fields[itemId] || {};
  appState.fields[itemId][fieldKey] = status;
  saveState();
}

function markItem(itemId, status) {
  appState.cards[itemId] = status;
  FIELDS.forEach((field) => setFieldStatus(itemId, field.key, status === "mastered" ? "ok" : "miss"));
  saveState();
}

function isItemMastered(item) {
  return FIELDS.every((field) => fieldStatus(item.id, field.key) === "ok");
}

function getMastery() {
  const total = STUDY_ITEMS.length * FIELDS.length;
  const ok = STUDY_ITEMS.reduce((sum, item) => {
    return sum + FIELDS.filter((field) => fieldStatus(item.id, field.key) === "ok").length;
  }, 0);
  return { total, ok, percent: total ? Math.round((ok / total) * 100) : 0 };
}

function diffPills(item) {
  if (!item.diff.length) {
    return '<span class="diff-pill none">原則</span>';
  }
  return item.diff
    .map((key) => `<span class="diff-pill ${FIELD_MAP[key].tone}">${FIELD_MAP[key].short}</span>`)
    .join("");
}

function updateMasteryHeader() {
  const mastery = getMastery();
  document.getElementById("masteryPercent").textContent = `${mastery.percent}%`;
  document.getElementById("masteryBar").style.width = `${mastery.percent}%`;
}

function initTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      currentTab = button.dataset.tab;
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      document.querySelectorAll(".view").forEach((view) => view.classList.toggle("is-active", view.id === currentTab));
      renderCurrentTab();
    });
  });
}

function renderCurrentTab() {
  updateMasteryHeader();
  if (currentTab === "overview") renderOverview();
  if (currentTab === "matrix") renderMatrix();
  if (currentTab === "examples") renderExamples();
  if (currentTab === "cards") renderFlashCard();
  if (currentTab === "quiz") renderCoverage();
}

function renderOverview() {
  const exceptionCount = STUDY_ITEMS.filter((item) => item.diff.length).length;
  const masteredCount = STUDY_ITEMS.filter(isItemMastered).length;
  document.getElementById("summaryGrid").innerHTML = [
    { value: STUDY_ITEMS.length, label: "暗記カード数" },
    { value: exceptionCount, label: "原則から外れる項目" },
    { value: STUDY_ITEMS.length * FIELDS.length + EXTRA_QUESTIONS.length, label: "出題できる問題数" },
    { value: masteredCount, label: "3列とも正解済みの項目" }
  ]
    .map((card) => `<div class="summary-card"><strong>${card.value}</strong><span>${card.label}</span></div>`)
    .join("");

  document.getElementById("flowLanes").innerHTML = FIELDS.map((field) => {
    const cards = STUDY_ITEMS.filter((item) => item.diff.includes(field.key) || item.id === "principle")
      .map(
        (item) => `
          <div class="mini-card ${field.tone}">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item[field.key])}</span>
          </div>
        `
      )
      .join("");
    return `
      <section class="lane">
        <div class="lane-title"><span class="badge">${field.short}</span>${field.label}</div>
        ${cards}
      </section>
    `;
  }).join("");

  renderRadar();
}

function renderRadar() {
  const items = onlyWeak ? STUDY_ITEMS.filter((item) => !isItemMastered(item)) : STUDY_ITEMS;
  document.getElementById("radarList").innerHTML = items
    .map((item) => {
      const chips = FIELDS.map((field) => {
        const isDiff = item.diff.includes(field.key);
        return `<div class="radar-chip ${field.tone} ${isDiff ? "is-diff" : ""}">${field.short}</div>`;
      }).join("");
      return `
        <article class="radar-item ${isItemMastered(item) ? "is-mastered" : ""}">
          <div>
            <div class="radar-title">${escapeHtml(item.title)}</div>
            <div class="radar-sub">${escapeHtml(item.group)} / ${item.diff.length ? "例外: " + item.diff.map((key) => FIELD_MAP[key].short).join("・") : "原則"}</div>
          </div>
          <div class="radar-marks">${chips}</div>
        </article>
      `;
    })
    .join("");
}

function initOverviewControls() {
  document.getElementById("toggleOnlyWeak").addEventListener("click", (event) => {
    onlyWeak = !onlyWeak;
    event.currentTarget.textContent = onlyWeak ? "すべて表示" : "未定着だけ表示";
    renderRadar();
  });
}

function initMatrixControls() {
  const groupFilter = document.getElementById("groupFilter");
  groupFilter.innerHTML += GROUPS.map((group) => `<option value="${escapeHtml(group)}">${escapeHtml(group)}</option>`).join("");
  document.getElementById("searchInput").addEventListener("input", renderMatrix);
  groupFilter.addEventListener("change", renderMatrix);
}

function itemMatchesFilters(item) {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const group = document.getElementById("groupFilter").value;
  const text = [item.title, item.group, item.time, item.law, item.taxpayer, item.rule, item.example].join(" ").toLowerCase();
  return (!query || text.includes(query)) && (group === "all" || item.group === group);
}

function renderMatrix() {
  const rows = STUDY_ITEMS.filter(itemMatchesFilters)
    .map(
      (item) => `
        <tr>
          <td class="target-cell">
            <strong>${escapeHtml(item.title)}</strong>
            <span class="group-tag">${escapeHtml(item.group)}</span>
          </td>
          <td>${escapeHtml(item.time)}</td>
          <td>${escapeHtml(item.law)}</td>
          <td>${escapeHtml(item.taxpayer)}</td>
          <td><div class="diff-list">${diffPills(item)}</div></td>
        </tr>
      `
    )
    .join("");
  document.getElementById("matrixBody").innerHTML = rows || `<tr><td colspan="5">該当する項目がありません。</td></tr>`;
}

function renderExamples() {
  document.getElementById("exampleGrid").innerHTML = STUDY_ITEMS.map((item, index) => {
    return `
      <article class="example-card">
        <span class="group-tag">${escapeHtml(item.group)}</span>
        <h3>${index + 1}. ${escapeHtml(item.title)}</h3>
        <p><b>考え方</b><br>${escapeHtml(item.rule)}</p>
        <p><b>例</b><br>${escapeHtml(item.example)}</p>
        <button class="secondary-button reveal-answer" data-reveal="${escapeHtml(item.id)}">3列の答えを表示</button>
        <div class="answer-strip hidden" id="answer-${escapeHtml(item.id)}">
          ${FIELDS.map((field) => `<div class="answer-line"><b>${field.label}</b>${escapeHtml(item[field.key])}</div>`).join("")}
          <div class="memory-tip">${escapeHtml(item.memory)}</div>
        </div>
      </article>
    `;
  }).join("");
}

function initExampleControls() {
  document.getElementById("exampleGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".reveal-answer");
    if (!button) return;
    const answer = document.getElementById(`answer-${button.dataset.reveal}`);
    const hidden = answer.classList.toggle("hidden");
    button.textContent = hidden ? "3列の答えを表示" : "3列の答えを隠す";
  });
}

function renderFlashCard() {
  const item = STUDY_ITEMS[flashIndex];
  const status = appState.cards[item.id];
  const statusCopy = status === "mastered" ? "覚えた" : status === "weak" ? "あやしい" : "未判定";
  const card = document.getElementById("flashCard");

  if (!flashFlipped) {
    card.innerHTML = `
      <div>
        <div class="flash-kicker">${flashIndex + 1} / ${STUDY_ITEMS.length}　${escapeHtml(item.group)}　${statusCopy}</div>
        <div class="flash-title">${escapeHtml(item.title)}</div>
        <div class="flash-body">
          <p>${escapeHtml(item.example)}</p>
          <p>この状況の「確定時期・適用法令・納税義務者」を声に出して答える。</p>
        </div>
      </div>
    `;
  } else {
    card.innerHTML = `
      <div>
        <div class="flash-kicker">${flashIndex + 1} / ${STUDY_ITEMS.length}　答え</div>
        <div class="flash-title">${escapeHtml(item.title)}</div>
        <div class="flash-answers">
          ${FIELDS.map((field) => `<div class="answer-line"><b>${field.label}</b>${escapeHtml(item[field.key])}</div>`).join("")}
        </div>
        <div class="memory-tip">${escapeHtml(item.memory)}</div>
      </div>
    `;
  }
}

function initFlashControls() {
  const move = (step) => {
    flashIndex = (flashIndex + step + STUDY_ITEMS.length) % STUDY_ITEMS.length;
    flashFlipped = false;
    renderFlashCard();
  };
  document.getElementById("prevCard").addEventListener("click", () => move(-1));
  document.getElementById("nextCard").addEventListener("click", () => move(1));
  document.getElementById("flipCard").addEventListener("click", () => {
    flashFlipped = !flashFlipped;
    document.getElementById("flipCard").textContent = flashFlipped ? "問題に戻る" : "答えを見る";
    renderFlashCard();
  });
  document.getElementById("flashCard").addEventListener("click", () => {
    flashFlipped = !flashFlipped;
    document.getElementById("flipCard").textContent = flashFlipped ? "問題に戻る" : "答えを見る";
    renderFlashCard();
  });
  document.getElementById("markMastered").addEventListener("click", () => {
    markItem(STUDY_ITEMS[flashIndex].id, "mastered");
    renderFlashCard();
    updateMasteryHeader();
    renderCoverage();
  });
  document.getElementById("markWeak").addEventListener("click", () => {
    markItem(STUDY_ITEMS[flashIndex].id, "weak");
    renderFlashCard();
    updateMasteryHeader();
    renderCoverage();
  });
}

function buildQuestionBank(includeExtras = true) {
  const fieldQuestions = STUDY_ITEMS.flatMap((item) =>
    FIELDS.map((field) => {
      const correct = item[field.key];
      return {
        id: `${item.id}:${field.key}`,
        itemId: item.id,
        fieldKey: field.key,
        prompt: `「${item.title}」の${field.label}はどれか。`,
        hint: item.rule,
        correct,
        options: buildOptions(field.key, correct),
        explanation: item.memory
      };
    })
  );
  return includeExtras ? [...fieldQuestions, ...EXTRA_QUESTIONS] : fieldQuestions;
}

function buildOptions(fieldKey, correct) {
  const pool = unique([
    ...STUDY_ITEMS.map((item) => item[fieldKey]),
    FIELD_MAP[fieldKey]?.principle
  ]).filter((option) => option !== correct);
  const wrong = shuffle(pool).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

function startQuiz(size) {
  const bank = buildQuestionBank(true);
  const questions = size === "all" ? shuffle(bank) : shuffle(bank).slice(0, size);
  currentQuiz = {
    questions,
    index: 0,
    score: 0,
    selected: null,
    answered: false,
    history: []
  };
  renderQuiz();
}

function answerQuestion(choice) {
  if (!currentQuiz || currentQuiz.answered) return;
  const question = currentQuiz.questions[currentQuiz.index];
  const correct = choice === question.correct;
  currentQuiz.selected = choice;
  currentQuiz.answered = true;
  if (correct) currentQuiz.score += 1;
  currentQuiz.history.push({
    prompt: question.prompt,
    selected: choice,
    correct: question.correct,
    ok: correct
  });
  if (question.itemId && question.fieldKey) {
    setFieldStatus(question.itemId, question.fieldKey, correct ? "ok" : "miss");
  }
  updateMasteryHeader();
  renderCoverage();
  renderQuiz();
}

function goNextQuestion() {
  if (!currentQuiz) return;
  if (currentQuiz.index >= currentQuiz.questions.length - 1) {
    renderQuizResults();
    return;
  }
  currentQuiz.index += 1;
  currentQuiz.selected = null;
  currentQuiz.answered = false;
  renderQuiz();
}

function renderQuiz() {
  if (!currentQuiz) return;
  const question = currentQuiz.questions[currentQuiz.index];
  const total = currentQuiz.questions.length;
  const answered = currentQuiz.answered;
  const panel = document.getElementById("quizPanel");
  panel.innerHTML = `
    <div class="quiz-topline">
      <span>問題 ${currentQuiz.index + 1} / ${total}</span>
      <span>正解 ${currentQuiz.score}</span>
    </div>
    <div class="question-title">${escapeHtml(question.prompt)}</div>
    <div class="question-hint">${escapeHtml(question.hint || "")}</div>
    <div class="choices">
      ${question.options
        .map((option) => {
          const className = answered
            ? option === question.correct
              ? "correct"
              : option === currentQuiz.selected
                ? "wrong"
                : ""
            : "";
          return `<button class="choice ${className}" data-choice="${escapeHtml(option)}" ${answered ? "disabled" : ""}>${escapeHtml(option)}</button>`;
        })
        .join("")}
    </div>
    ${
      answered
        ? `<div class="feedback ${currentQuiz.selected === question.correct ? "good" : "bad"}">
            <b>${currentQuiz.selected === question.correct ? "正解" : "不正解"}</b><br>
            正答: ${escapeHtml(question.correct)}<br>
            ${escapeHtml(question.explanation || "")}
          </div>
          <div class="quiz-actions">
            <button class="primary-button" id="nextQuestion">${currentQuiz.index >= total - 1 ? "結果を見る" : "次の問題"}</button>
          </div>`
        : ""
    }
  `;
}

function renderQuizResults() {
  if (!currentQuiz) return;
  const total = currentQuiz.questions.length;
  const missed = currentQuiz.history.filter((entry) => !entry.ok);
  document.getElementById("quizPanel").innerHTML = `
    <div class="empty-state">
      <h3>${currentQuiz.score} / ${total} 正解</h3>
      <p>${missed.length ? "間違えた問題を下で確認する。" : "全問正解。かなり固まっている。"}</p>
    </div>
    <div class="result-list">
      ${missed
        .map(
          (entry) => `
            <div class="result-row">
              <b>${escapeHtml(entry.prompt)}</b><br>
              選択: ${escapeHtml(entry.selected)}<br>
              正答: ${escapeHtml(entry.correct)}
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function initQuizControls() {
  document.getElementById("startAllQuiz").addEventListener("click", () => startQuiz("all"));
  document.getElementById("startQuickQuiz").addEventListener("click", () => startQuiz(10));
  document.getElementById("resetProgress").addEventListener("click", () => {
    const ok = confirm("学習進捗をリセットしますか。");
    if (!ok) return;
    appState = { fields: {}, cards: {} };
    saveState();
    updateMasteryHeader();
    renderCoverage();
    renderCurrentTab();
  });
  document.getElementById("quizPanel").addEventListener("click", (event) => {
    const choice = event.target.closest(".choice");
    if (choice) {
      answerQuestion(choice.dataset.choice);
      return;
    }
    if (event.target.id === "nextQuestion") {
      goNextQuestion();
    }
  });
}

function renderCoverage() {
  const grid = document.getElementById("coverageGrid");
  if (!grid) return;
  grid.innerHTML = STUDY_ITEMS.map((item) => {
    const cells = FIELDS.map((field) => {
      const status = fieldStatus(item.id, field.key);
      const className = status === "ok" ? "ok" : status === "miss" ? "miss" : "";
      return `<span class="coverage-cell ${className}" title="${escapeHtml(field.label)}"></span>`;
    }).join("");
    return `
      <div class="coverage-row">
        <span class="coverage-name" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</span>
        ${cells}
      </div>
    `;
  }).join("");
}

function init() {
  initTabs();
  initOverviewControls();
  initMatrixControls();
  initExampleControls();
  initFlashControls();
  initQuizControls();
  renderOverview();
  renderMatrix();
  renderExamples();
  renderFlashCard();
  renderCoverage();
  updateMasteryHeader();
}

document.addEventListener("DOMContentLoaded", init);
