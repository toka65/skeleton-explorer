import { useState, useCallback } from 'react';
import FullBody from './components/FullBody';
import HandDetail from './components/HandDetail';
import FootDetail from './components/FootDetail';
import SkullDetail from './components/SkullDetail';
import ShoulderDetail from './components/ShoulderDetail';
import SpineDetail from './components/SpineDetail';
import BoneInfoCard from './components/BoneInfoCard';
import { boneData, handBoneData, footBoneData, skullBoneData, shoulderBoneData, spineBoneData } from './data/bones';
import './App.css';

const viewDataMap = {
  fullBody: boneData,
  handDetail: handBoneData,
  footDetail: footBoneData,
  skullDetail: skullBoneData,
  shoulderDetail: shoulderBoneData,
  spineDetail: spineBoneData,
};

const viewLabels = {
  fullBody: { title: 'Explore the Human Skeleton', text: 'Hover over any bone to see its name. Click it to learn more!' },
  handDetail: { title: 'Explore the Hand Bones', text: 'This hand has 27 bones! Click each one to learn what it does.' },
  footDetail: { title: 'Explore the Foot Bones', text: 'This foot has 26 bones! Click each one to learn what it does.' },
  skullDetail: { title: 'Explore the Skull Bones', text: 'The skull has 22 bones! Click each one to learn what it does.' },
  shoulderDetail: { title: 'Explore the Shoulder', text: 'The shoulder has 3 bones and several key features. Click to learn!' },
  spineDetail: { title: 'Explore the Spine', text: 'The spine has 33 vertebrae in 5 regions. Click to learn about each!' },
};

export default function App() {
  const [view, setView] = useState('fullBody');
  const [selectedBone, setSelectedBone] = useState(null);
  const [hoveredBone, setHoveredBone] = useState(null);
  const [studied, setStudied] = useState(new Set());

  const currentData = viewDataMap[view];
  const boneInfo = selectedBone ? currentData[selectedBone] : null;

  const handleClick = useCallback(
    (id) => {
      setSelectedBone((prev) => (prev === id ? null : id));
      setStudied((prev) => new Set(prev).add(id));
    },
    []
  );

  const handleHover = useCallback((id) => setHoveredBone(id), []);
  const handleLeave = useCallback(() => setHoveredBone(null), []);

  const switchView = (v) => {
    setView(v);
    setSelectedBone(null);
    setHoveredBone(null);
  };

  const totalBones = Object.keys(currentData).length;
  const studiedInView = Object.keys(currentData).filter((k) => studied.has(k)).length;
  const hoveredInfo = hoveredBone ? currentData[hoveredBone] : null;
  const labels = viewLabels[view];

  const clickableViewMap = { hand: 'handDetail', foot: 'footDetail', skull: 'skullDetail', shoulder: 'shoulderDetail', spine: 'spineDetail' };
  const exploreTarget = boneInfo?.clickable
    ? () => switchView(clickableViewMap[boneInfo.clickable])
    : null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">Skeleton Explorer</h1>
          <p className="app-subtitle">Click any bone to learn about it!</p>
        </div>
        <div className="header-right">
          <div className="progress-badge">
            <span className="progress-number">{studiedInView}</span>
            <span className="progress-sep">/</span>
            <span className="progress-total">{totalBones}</span>
            <span className="progress-label">studied</span>
          </div>
        </div>
      </header>

      <div className="app-body">
        <div className="skeleton-panel">
          <div className="view-nav">
            <button
              className={`nav-btn ${view === 'fullBody' ? 'nav-btn-active' : ''}`}
              onClick={() => switchView('fullBody')}
            >
              Full Body
            </button>
            <button
              className={`nav-btn ${view === 'handDetail' ? 'nav-btn-active' : ''}`}
              onClick={() => switchView('handDetail')}
            >
              Hand Detail
            </button>
            <button
              className={`nav-btn ${view === 'footDetail' ? 'nav-btn-active' : ''}`}
              onClick={() => switchView('footDetail')}
            >
              Foot Detail
            </button>
            <button
              className={`nav-btn ${view === 'skullDetail' ? 'nav-btn-active' : ''}`}
              onClick={() => switchView('skullDetail')}
            >
              Skull Detail
            </button>
            <button
              className={`nav-btn ${view === 'shoulderDetail' ? 'nav-btn-active' : ''}`}
              onClick={() => switchView('shoulderDetail')}
            >
              Shoulder
            </button>
            <button
              className={`nav-btn ${view === 'spineDetail' ? 'nav-btn-active' : ''}`}
              onClick={() => switchView('spineDetail')}
            >
              Spine
            </button>
          </div>

          {hoveredInfo && !selectedBone && (
            <div className="hover-tooltip">{hoveredInfo.name}</div>
          )}

          <div className="svg-container">
            {view === 'fullBody' && (
              <FullBody
                selected={selectedBone}
                hovered={hoveredBone}
                onClick={handleClick}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            )}
            {view === 'handDetail' && (
              <HandDetail
                selected={selectedBone}
                hovered={hoveredBone}
                onClick={handleClick}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            )}
            {view === 'footDetail' && (
              <FootDetail
                selected={selectedBone}
                hovered={hoveredBone}
                onClick={handleClick}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            )}
            {view === 'skullDetail' && (
              <SkullDetail
                selected={selectedBone}
                hovered={hoveredBone}
                onClick={handleClick}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            )}
            {view === 'shoulderDetail' && (
              <ShoulderDetail
                selected={selectedBone}
                hovered={hoveredBone}
                onClick={handleClick}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            )}
            {view === 'spineDetail' && (
              <SpineDetail
                selected={selectedBone}
                hovered={hoveredBone}
                onClick={handleClick}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            )}
          </div>
        </div>

        <div className="info-panel">
          {boneInfo ? (
            <BoneInfoCard
              bone={boneInfo}
              onClose={() => setSelectedBone(null)}
              onExplore={exploreTarget}
            />
          ) : (
            <div className="info-placeholder">
              <div className="placeholder-icon">
                <svg viewBox="0 0 80 80" width={80} height={80}>
                  {view === 'fullBody' ? (
                    <>
                      <circle cx={40} cy={20} r={14} fill="none" stroke="#4a5568" strokeWidth={2} />
                      <line x1={40} y1={34} x2={40} y2={60} stroke="#4a5568" strokeWidth={2} />
                      <line x1={25} y1={42} x2={55} y2={42} stroke="#4a5568" strokeWidth={2} />
                      <line x1={40} y1={60} x2={28} y2={78} stroke="#4a5568" strokeWidth={2} />
                      <line x1={40} y1={60} x2={52} y2={78} stroke="#4a5568" strokeWidth={2} />
                    </>
                  ) : view === 'handDetail' ? (
                    <>
                      <rect x={25} y={30} width={30} height={20} rx={3} fill="none" stroke="#4a5568" strokeWidth={2} />
                      <line x1={30} y1={50} x2={28} y2={70} stroke="#4a5568" strokeWidth={2} />
                      <line x1={37} y1={50} x2={36} y2={73} stroke="#4a5568" strokeWidth={2} />
                      <line x1={43} y1={50} x2={44} y2={73} stroke="#4a5568" strokeWidth={2} />
                      <line x1={50} y1={50} x2={52} y2={70} stroke="#4a5568" strokeWidth={2} />
                      <line x1={25} y1={38} x2={15} y2={55} stroke="#4a5568" strokeWidth={2} />
                    </>
                  ) : (
                    <>
                      <rect x={20} y={10} width={40} height={30} rx={5} fill="none" stroke="#4a5568" strokeWidth={2} />
                      <line x1={24} y1={40} x2={18} y2={65} stroke="#4a5568" strokeWidth={2} />
                      <line x1={32} y1={40} x2={30} y2={70} stroke="#4a5568" strokeWidth={2} />
                      <line x1={40} y1={40} x2={40} y2={72} stroke="#4a5568" strokeWidth={2} />
                      <line x1={48} y1={40} x2={50} y2={70} stroke="#4a5568" strokeWidth={2} />
                      <line x1={56} y1={40} x2={60} y2={65} stroke="#4a5568" strokeWidth={2} />
                    </>
                  )}
                </svg>
              </div>
              <h3 className="placeholder-title">{labels.title}</h3>
              <p className="placeholder-text">{labels.text}</p>
              {view === 'fullBody' && (
                <p className="placeholder-hint">
                  Tip: Click on a hand or foot to explore all their bones up close!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
