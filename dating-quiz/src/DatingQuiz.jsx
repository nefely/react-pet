import React, { useMemo, useState } from "react";

/** ===== Questions bank (branching) ===== */
const QUESTIONS = {
  q1_youAre: {
    id: "q1_youAre",
    text: "Ти хто?",
    type: "single",
    options: [
      { value: "man", label: "Чоловік", next: "q2_lookingFor" },
      { value: "woman", label: "Жінка", next: "q2_lookingFor" },
      { value: "nonbinary", label: "Небінарна персона", next: "q2_lookingFor" },
    ],
  },

  q2_lookingFor: {
    id: "q2_lookingFor",
    text: "Кого шукаєш?",
    type: "single",
    options: [
      { value: "women", label: "Жінок", next: "q_bodyType" },
      { value: "men", label: "Чоловіків", next: "q_bodyType" },
      { value: "any", label: "Будь-кого", next: "q_bodyType" },
    ],
  },

  /** ✅ NEW: Multi-select question */
  q_bodyType: {
    id: "q_bodyType",
    text: "Який тип тіла тобі подобається? (можна декілька)",
    type: "multi",
    minSelected: 1, // скільки мінімально треба вибрати
    next: "q3_ageThey",
    options: [
      { value: "slim", label: "Струнка/ий" },
      { value: "normal", label: "Нормальна статура" },
      { value: "curvy", label: "Пишні форми" },
      { value: "plus", label: "Повна/ий" },
      { value: "athletic", label: "Атлетична статура" },
      { value: "muscular", label: "Мускулиста/ий" },
      { value: "any", label: "Не важливо" },
    ],
  },

  q3_ageThey: {
    id: "q3_ageThey",
    text: "Якого віку шукаєш?",
    type: "range",
    min: 18,
    max: 80,
    defaultMin: 25,
    defaultMax: 40,
    next: "q4_yourAge",
  },

  q4_yourAge: {
    id: "q4_yourAge",
    text: "Ти якого віку?",
    type: "number",
    min: 18,
    max: 99,
    placeholder: "Наприклад, 29",
    next: "q5_goal",
  },

  q5_goal: {
    id: "q5_goal",
    text: "Для чого ти тут?",
    type: "single",
    options: [
      { value: "serious", label: "Серйозні стосунки", next: "q6_values" },
      { value: "dating", label: "Побачення", next: "q6_meetPace" },
      { value: "chat", label: "Флірт / чат", next: "q6_chatStyle" },
      { value: "casual", label: "Без зобовʼязань", next: "q6_casualBoundaries" },
    ],
  },

  // branch: serious
  q6_values: {
    id: "q6_values",
    text: "Що для тебе важливо в партнері?",
    type: "single",
    options: [
      { value: "family", label: "Сімейність", next: "q7_distance" },
      { value: "ambition", label: "Амбіції / розвиток", next: "q7_distance" },
      { value: "kindness", label: "Доброта", next: "q7_distance" },
    ],
  },

  // branch: dating
  q6_meetPace: {
    id: "q6_meetPace",
    text: "Як швидко хочеш переходити до реальних зустрічей?",
    type: "single",
    options: [
      { value: "asap", label: "Майже одразу", next: "q7_distance" },
      { value: "fewDays", label: "Після кількох днів спілкування", next: "q7_distance" },
      { value: "slow", label: "Повільно, без поспіху", next: "q7_distance" },
    ],
  },

  // branch: chat
  q6_chatStyle: {
    id: "q6_chatStyle",
    text: "Який формат спілкування тобі комфортніший?",
    type: "single",
    options: [
      { value: "text", label: "Текст", next: "q7_distance" },
      { value: "voice", label: "Голосові", next: "q7_distance" },
      { value: "video", label: "Відеодзвінки", next: "q7_distance" },
    ],
  },

  // branch: casual
  q6_casualBoundaries: {
    id: "q6_casualBoundaries",
    text: "Щоб усім було ок: який формат тобі підходить?",
    type: "single",
    options: [
      { value: "clear", label: "Чіткі домовленості", next: "q7_distance" },
      { value: "easy", label: "Легко і без драм", next: "q7_distance" },
      { value: "open", label: "Відкритість до варіантів", next: "q7_distance" },
    ],
  },

  // common end
  q7_distance: {
    id: "q7_distance",
    text: "Дистанція: як тобі комфортно?",
    type: "single",
    options: [
      { value: "myCity", label: "Тільки моє місто", next: "q8_done" },
      { value: "nearby", label: "Місто + поруч", next: "q8_done" },
      { value: "online", label: "Ок з онлайн", next: "q8_done" },
    ],
  },

  q8_done: {
    id: "q8_done",
    text: "Готово ✅",
    type: "done",
  },
};

/** ===== Component ===== */
export default function DatingQuiz() {
  const [currentId, setCurrentId] = useState("q1_youAre");
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]); // stack of previous questionIds

  const current = QUESTIONS[currentId];

  const resetQuiz = () => {
    setCurrentId("q1_youAre");
    setAnswers({});
    setHistory([]);
  };

  const goNext = (nextId) => {
    if (!nextId) return;
    setHistory((prev) => [...prev, currentId]); // push current before moving
    setCurrentId(nextId);
  };

  const goBack = () => {
    if (history.length === 0) return;

    const prevId = history[history.length - 1];

    // delete last (current) answer
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentId];
      return copy;
    });

    // pop history
    setHistory((prev) => prev.slice(0, -1));

    // go to previous step
    setCurrentId(prevId);
  };

  const onAnswerSingle = (opt) => {
    setAnswers((prev) => ({ ...prev, [currentId]: opt.value }));
    goNext(opt.next);
  };

  /** ✅ NEW: multi-select toggle */
  const toggleMulti = (value) => {
    setAnswers((prev) => {
      const currentArr = Array.isArray(prev[currentId]) ? prev[currentId] : [];
      const has = currentArr.includes(value);

      // Якщо вибрали "Не важливо" — зручно зробити її ексклюзивною
      if (value === "any") {
        return { ...prev, [currentId]: has ? [] : ["any"] };
      }
      if (currentArr.includes("any")) {
        // якщо раніше стояло "any" — прибираємо його коли вибираємо конкретику
        const cleaned = currentArr.filter((v) => v !== "any");
        return { ...prev, [currentId]: [...cleaned, value] };
      }

      return {
        ...prev,
        [currentId]: has ? currentArr.filter((v) => v !== value) : [...currentArr, value],
      };
    });
  };

  // range: memo default if not answered yet
  const rangeValue = useMemo(() => {
    if (current?.type !== "range") return null;

    const saved = answers[currentId];
    if (saved?.min != null && saved?.max != null) return saved;

    return { min: current.defaultMin, max: current.defaultMax };
  }, [answers, current, currentId]);

  const renderQuestion = () => {
    if (!current) return <div>Question not found</div>;

    if (current.type === "done") {
      return (
        <div>
          <h2 style={{ margin: 0 }}>{current.text}</h2>

          <p style={{ opacity: 0.8, marginTop: 8 }}>Твої відповіді (debug):</p>
          <pre
            style={{
              background: "#0b0b0b",
              color: "#d6ffd6",
              padding: 12,
              borderRadius: 10,
              overflow: "auto",
            }}
          >
            {JSON.stringify(answers, null, 2)}
          </pre>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            <a style={btnPrimary} className="btn" href="{offer_link}">
              Продовжити
            </a>
            <button onClick={resetQuiz} style={btnSecondary}>
              Пройти ще раз
            </button>
          </div>
        </div>
      );
    }

    if (current.type === "single") {
      return (
        <div>
          <h2 style={{ margin: 0 }}>{current.text}</h2>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            {current.options.map((opt) => (
              <button key={opt.value} onClick={() => onAnswerSingle(opt)} style={btnPrimary}>
                {opt.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            {history.length > 0 && (
              <button onClick={goBack} style={btnSecondary}>
                ← Назад
              </button>
            )}
          </div>
        </div>
      );
    }

    /** ✅ NEW: multi question UI */
    if (current.type === "multi") {
      const selected = Array.isArray(answers[currentId]) ? answers[currentId] : [];
      const min = current.minSelected ?? 1;
      const canNext = selected.length >= min;

      return (
        <div>
          <h2 style={{ margin: 0 }}>{current.text}</h2>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            {current.options.map((opt) => {
              const isActive = selected.includes(opt.value);

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleMulti(opt.value)}
                  style={{
                    ...btnPrimary,
                    background: isActive ? "#ff3d6e" : "transparent",
                    border: isActive ? "1px solid #ff3d6e" : "1px solid #444",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <span>{opt.label}</span>
                  <span style={checkPill}>{isActive ? "✓" : ""}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {history.length > 0 && (
              <button onClick={goBack} style={btnSecondary}>
                ← Назад
              </button>
            )}

            <button
              onClick={() => {
                if (!canNext) {
                  alert(`Обери хоча б ${min} варіант`);
                  return;
                }
                goNext(current.next);
              }}
              style={{
                ...btnPrimary,
                opacity: canNext ? 1 : 0.6,
              }}
            >
              Далі →
            </button>
          </div>
        </div>
      );
    }

    if (current.type === "number") {
      const saved = answers[currentId] ?? "";

      return (
        <div>
          <h2 style={{ margin: 0 }}>{current.text}</h2>

          <input
            type="number"
            min={current.min}
            max={current.max}
            placeholder={current.placeholder}
            value={saved}
            onChange={(e) => {
              const v = e.target.value === "" ? "" : Number(e.target.value);
              setAnswers((prev) => ({ ...prev, [currentId]: v }));
            }}
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {history.length > 0 && (
              <button onClick={goBack} style={btnSecondary}>
                ← Назад
              </button>
            )}
            <button
              onClick={() => {
                const v = answers[currentId];
                if (typeof v !== "number") {
                  alert("Enter your age");
                  return;
                }
                goNext(current.next);
              }}
              style={btnPrimary}
            >
              Далі →
            </button>
          </div>
        </div>
      );
    }

    if (current.type === "range") {
      const v = rangeValue;

      return (
        <div>
          <h2 style={{ margin: 0 }}>{current.text}</h2>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            <label style={labelStyle}>
              Мін:
              <input
                type="number"
                min={current.min}
                max={current.max}
                value={v.min}
                onChange={(e) => {
                  const min = Number(e.target.value);
                  setAnswers((prev) => ({
                    ...prev,
                    [currentId]: { min, max: Math.max(min, v.max) },
                  }));
                }}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Макс:
              <input
                type="number"
                min={current.min}
                max={current.max}
                value={v.max}
                onChange={(e) => {
                  const max = Number(e.target.value);
                  setAnswers((prev) => ({
                    ...prev,
                    [currentId]: { min: Math.min(v.min, max), max },
                  }));
                }}
                style={inputStyle}
              />
            </label>

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              {history.length > 0 && (
                <button onClick={goBack} style={btnSecondary}>
                  ← Назад
                </button>
              )}
              <button
                onClick={() => {
                  if (!answers[currentId]) {
                    setAnswers((prev) => ({ ...prev, [currentId]: v }));
                  }
                  goNext(current.next);
                }}
                style={btnPrimary}
              >
                Далі →
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <div>Unknown question type: {current.type}</div>;
  };

  return (
    <div style={wrapStyle}>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Крок: {history.length + 1}</div>
        </div>

        {renderQuestion()}
      </div>
    </div>
  );
}

/** ===== simple inline styles ===== */
const wrapStyle = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: 20,
  background: "#111",
  color: "#fff",
};

const cardStyle = {
  width: "100%",
  maxWidth: 520,
  background: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: 14,
  padding: 18,
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
};

const btnPrimary = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #333",
  background: "#ff3d6e",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  textDecoration: "none",
};

const btnSecondary = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #444",
  background: "transparent",
  color: "#ddd",
  fontWeight: 600,
  cursor: "pointer",
};

const inputStyle = {
  marginTop: 14,
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid #333",
  background: "#101010",
  color: "#fff",
  outline: "none",
};

const labelStyle = {
  display: "grid",
  gap: 6,
  fontSize: 14,
  opacity: 0.9,
};

const checkPill = {
  width: 22,
  height: 22,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.35)",
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
  lineHeight: 1,
};
