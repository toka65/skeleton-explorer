import { regionColors, handTypeColors, footTypeColors, skullTypeColors, shoulderTypeColors, spineTypeColors, ribcageTypeColors } from '../data/bones';

const typeDisplayNames = {
  carpal: 'Carpal (Wrist)',
  metacarpal: 'Metacarpal (Palm)',
  phalanx: 'Phalanx (Finger)',
  tarsal: 'Tarsal (Ankle)',
  metatarsal: 'Metatarsal (Midfoot)',
  cranial: 'Cranial Bone',
  facial: 'Facial Bone',
  shoulder_bone: 'Shoulder Bone',
  shoulder_feature: 'Shoulder Feature',
  shoulder_connected: 'Connected Bone',
  cervical: 'Cervical',
  thoracic: 'Thoracic',
  lumbar: 'Lumbar',
  sacral: 'Sacral',
  feature: 'Feature',
  sternum: 'Sternum',
  true_rib: 'True Rib',
  false_rib: 'False Rib',
  floating_rib: 'Floating Rib',
  cartilage: 'Cartilage',
};

export default function BoneInfoCard({ bone, onClose, onExplore }) {
  if (!bone) return null;

  const typeColors = { ...handTypeColors, ...footTypeColors, ...skullTypeColors, ...shoulderTypeColors, ...spineTypeColors, ...ribcageTypeColors };
  const accentColor =
    bone.type
      ? typeColors[bone.type] || '#f06292'
      : regionColors[bone.region] || '#64b5f6';

  const displayType = bone.type
    ? (typeDisplayNames[bone.type] || bone.type)
    : bone.region;

  return (
    <div className="bone-info-card" style={{ borderTopColor: accentColor }}>
      <button className="bone-info-close" onClick={onClose}>
        &times;
      </button>
      <div className="bone-info-badge" style={{ backgroundColor: accentColor }}>
        {displayType}
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
