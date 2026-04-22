import { useState, useEffect, useCallback } from 'react';
import { sampleTest, testResults } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

type TestPhase = 'intro' | 'active' | 'result';

export default function TestPage() {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [timeLeft, setTimeLeft] = useState(sampleTest.timeLimit * 60);
  const [score, setScore] = useState(0);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const finishTest = useCallback(() => {
    let correct = 0;
    sampleTest.questions.forEach((q) => {
      const userAnswers = answers[q.id] ?? [];
      const isCorrect =
        q.correctAnswers.length === userAnswers.length &&
        q.correctAnswers.every((a) => userAnswers.includes(a));
      if (isCorrect) correct++;
    });
    const pct = Math.round((correct / sampleTest.questions.length) * 100);
    setScore(pct);
    setPhase('result');
  }, [answers]);

  useEffect(() => {
    if (phase !== 'active') return;
    if (timeLeft <= 0) { finishTest(); return; }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft, finishTest]);

  const toggleAnswer = (qId: string, optionIdx: number, type: 'single' | 'multi') => {
    setAnswers((prev) => {
      const current = prev[qId] ?? [];
      if (type === 'single') return { ...prev, [qId]: [optionIdx] };
      const exists = current.includes(optionIdx);
      return { ...prev, [qId]: exists ? current.filter((x) => x !== optionIdx) : [...current, optionIdx] };
    });
  };

  const question = sampleTest.questions[currentQ];
  const selectedAnswers = answers[question?.id] ?? [];
  const passed = score >= sampleTest.passThreshold;
  const answeredCount = Object.keys(answers).length;

  // ─── Intro screen ────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <>
        <div className="page-header">
          <h2 className="page-title">Testy i egzaminy BHP</h2>
          <p className="page-subtitle">Rozwiąż test, aby potwierdzić ukończenie szkolenia</p>
        </div>

        {/* Available tests */}
        <div className="section">
          <div className="section-header">
            <h3 className="section-title">Dostępne testy</h3>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: 28 }}>
            <div style={{ background: 'var(--dark)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                  {sampleTest.title}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                  Instruktaż stanowiskowy — hala produkcyjna
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Wymagany</span>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div className="test-stats-grid" style={{ gap: 16, marginBottom: 20 }}>
                {[
                  { label: 'Pytań', value: sampleTest.questions.length },
                  { label: 'Próg zdania', value: `${sampleTest.passThreshold}%` },
                  { label: 'Czas', value: `${sampleTest.timeLimit} min` },
                  { label: 'Próby', value: 'Bez limitu' },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '12px', background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderLeft: '3px solid var(--info)', borderRadius: 'var(--radius)', padding: '12px 14px', marginBottom: 20, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Zapoznaj się ze szkoleniem przed przystąpieniem do testu. Aby zaliczyć test, musisz uzyskać minimum <strong>{sampleTest.passThreshold}%</strong> poprawnych odpowiedzi.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => { setPhase('active'); setTimeLeft(sampleTest.timeLimit * 60); setAnswers({}); setCurrentQ(0); }}
                >
                  Rozwiąż test
                </button>
                <button className="btn btn-outline">Wróć do szkolenia</button>
              </div>
            </div>
          </div>
        </div>

        {/* Past results */}
        <div className="section">
          <div className="section-header">
            <h3 className="section-title">Historia wyników</h3>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Data</th>
                  <th>Wynik</th>
                  <th>Czas</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((r) => (
                  <tr key={r.id}>
                    <td><div className="table-name">{r.testTitle}</div></td>
                    <td><span className="table-mono">{r.date}</span></td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15, color: r.passed ? 'var(--success)' : 'var(--danger)' }}>
                        {r.score}%
                      </span>
                    </td>
                    <td><span className="table-mono">{r.duration} min</span></td>
                    <td><StatusBadge status={r.passed ? 'success' : 'danger'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  // ─── Result screen ────────────────────────────────────────────────────────
  if (phase === 'result') {
    const correctCount = Math.round((score / 100) * sampleTest.questions.length);
    return (
      <>
        <div className="page-header">
          <h2 className="page-title">Wynik testu</h2>
        </div>
        <div className="result-screen">
          <div className={`result-score-ring ${passed ? 'pass' : 'fail'}`}>
            <div className="result-score-pct">{score}%</div>
            <div className="result-score-label">wynik</div>
          </div>

          <div className={`result-verdict ${passed ? 'pass' : 'fail'}`}>
            {passed ? 'ZALICZONY' : 'NIEZALICZONY'}
          </div>

          <p className="result-summary">
            Udzieliłeś <strong>{correctCount}</strong> poprawnych odpowiedzi na <strong>{sampleTest.questions.length}</strong> pytań.
            {passed
              ? ` Gratulacje! Twój wynik (${score}%) przekracza próg zaliczenia (${sampleTest.passThreshold}%).`
              : ` Niestety nie osiągnąłeś progu zaliczenia wynoszącego ${sampleTest.passThreshold}%. Spróbuj ponownie.`}
          </p>

          {/* Answer review */}
          <div style={{ textAlign: 'left', marginBottom: 28 }}>
            {sampleTest.questions.map((q, i) => {
              const userAns = answers[q.id] ?? [];
              const isCorrect = q.correctAnswers.length === userAns.length && q.correctAnswers.every((a) => userAns.includes(a));
              return (
                <div key={q.id} style={{ padding: '10px 14px', marginBottom: 8, borderRadius: 'var(--radius)', background: isCorrect ? 'var(--success-bg)' : 'var(--danger-bg)', border: `1px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}` }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, color: isCorrect ? 'var(--success)' : 'var(--danger)', flexShrink: 0 }}>
                      {isCorrect ? '✓' : '✗'} {i + 1}.
                    </span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{q.question}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        Poprawna odpowiedź: <strong>{q.correctAnswers.map((a) => q.options[a]).join(', ')}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {passed ? (
              <button className="btn btn-success btn-lg">Pobierz certyfikat</button>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={() => { setPhase('active'); setTimeLeft(sampleTest.timeLimit * 60); setAnswers({}); setCurrentQ(0); }}
              >
                Spróbuj ponownie
              </button>
            )}
            <button className="btn btn-outline" onClick={() => setPhase('intro')}>← Powrót do testów</button>
          </div>
        </div>
      </>
    );
  }

  // ─── Active test ──────────────────────────────────────────────────────────
  const timerColor = timeLeft < 120 ? 'var(--danger)' : timeLeft < 300 ? 'var(--warning)' : 'var(--accent)';

  return (
    <>
      {/* Test progress header */}
      <div className="test-progress-header">
        <div>
          <div className="test-title">{sampleTest.title}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
            Pytanie {currentQ + 1} z {sampleTest.questions.length} · Odpowiedziano: {answeredCount}
          </div>
        </div>
        <div className="test-timer" style={{ color: timerColor }}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Overall progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ height: 4, background: 'var(--border)', borderRadius: 999 }}>
          <div style={{ height: '100%', width: `${((currentQ + 1) / sampleTest.questions.length) * 100}%`, background: 'var(--accent)', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
      </div>

      <div className="test-layout">
        {/* Question */}
        <div className="question-card">
          <div className="question-number">Pytanie {currentQ + 1} / {sampleTest.questions.length}</div>
          <div className="question-text">{question.question}</div>
          {question.type === 'multi' && (
            <div className="question-type-hint">Zaznacz wszystkie poprawne odpowiedzi</div>
          )}

          <div className="answer-options">
            {question.options.map((opt, idx) => {
              const isSelected = selectedAnswers.includes(idx);
              return (
                <div
                  key={idx}
                  className={`answer-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleAnswer(question.id, idx, question.type)}
                >
                  <div className={`answer-marker ${question.type === 'single' ? 'answer-radio' : ''}`}>
                    {isSelected && (question.type === 'single' ? '●' : '✓')}
                  </div>
                  <span className="answer-text">{opt}</span>
                </div>
              );
            })}
          </div>

          <div className="question-nav">
            <button
              className="btn btn-outline"
              disabled={currentQ === 0}
              onClick={() => setCurrentQ((q) => q - 1)}
            >
              ← Poprzednie
            </button>

            {currentQ < sampleTest.questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentQ((q) => q + 1)}
              >
                Następne →
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={finishTest}
              >
                ✅ Zakończ test
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="test-sidebar-card" style={{ marginBottom: 16 }}>
            <div className="test-sidebar-card-header">Nawigacja pytań</div>
            <div className="question-grid">
              {sampleTest.questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`question-dot ${i === currentQ ? 'current' : answers[q.id] ? 'answered' : ''}`}
                  onClick={() => setCurrentQ(i)}
                  title={`Pytanie ${i + 1}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="test-sidebar-card">
            <div className="test-sidebar-card-header">Informacje o teście</div>
            <div style={{ padding: '14px 16px', fontSize: 13 }}>
              {[
                { label: 'Odpowiedziano', value: `${answeredCount}/${sampleTest.questions.length}` },
                { label: 'Próg zaliczenia', value: `${sampleTest.passThreshold}%` },
                { label: 'Pozostały czas', value: formatTime(timeLeft) },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>{s.value}</span>
                </div>
              ))}
              <button
                className="btn btn-danger w-full"
                style={{ marginTop: 14, justifyContent: 'center' }}
                onClick={finishTest}
              >
                ⏹ Zakończ test
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
