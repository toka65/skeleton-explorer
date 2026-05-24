import { regionColors, handTypeColors, footTypeColors } from '../data/bones';

export default function BoneInfoCard({ bone, onClose, onExplore }) {
  if (!bone) return null;

  const typeColors = { ...handTypeColors, ...footTypeColors };
  const accentColor =
    bone.type
      ? typeColors[bone.type] || '#f06292'
      : regionColors[bone.region] || '#64b5f6';

  return (
    <div className="bone-info-card" style={{ borderTopColor: accentColor }}>
      <button className="bone-info-close" onClick={onClose}>
        &times;
      </button>
      <div className="bone-info-badge" style={{ backgroundColor: accentColor }}>
        {bone.type || bone.region}
      </div>
      <h2 className="bone-info-name">{bone.name}</h2>
      {bone.count && (
        <p className="bone-info-count">
          You have <strong>{bone.count}</strong> in your body
        </p>
      )}
      {bone.finger && (
        <p className="bone-info-count">
          Finger: <strong>{bone.finger}</strong>
        </p>
      )}
      <p className="bone-info-desc">{bone.description}</p>
      <div className="bone-info-fact">
        <span className="fact-label">Fun Fact</span>
        <p>{bone.funFact}</p>
      </div>
      {bone.clickable && onExplore && (
        <button className="bone-info-explore" onClick={onExplore}>
          {bone.exploreLabel || 'Explore Bones'} &rarr;
        </button>
      )}
    </div>
  );
}
