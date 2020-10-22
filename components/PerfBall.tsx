import { useConfig } from '../store';

export function PerfBall() {
  const { showPerfBall } = useConfig();
  return (
    <div className={`perf-ball-container ${showPerfBall ? '' : 'hidden'}`}>
      <div className="item"></div>
    </div>
  );
}
