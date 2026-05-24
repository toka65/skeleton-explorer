import { longBonePath, ribPath, vertebraPath } from '../utils/boneShapes';

const BONE_COLOR = '#e8d5b7';
const BONE_STROKE = '#c4a882';

function Bone({ id, d, onClick, onHover, onLeave, selected, hovered, className = '' }) {
  const isActive = selected === id;
  const isHovered = hovered === id;
  return (
    <path
      d={d}
      className={`bone ${className} ${isActive ? 'bone-selected' : ''} ${isHovered ? 'bone-hovered' : ''}`}
      fill={BONE_COLOR}
      stroke={BONE_STROKE}
      strokeWidth={1}
      onClick={() => onClick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    />
  );
}

function BoneGroup({ id, children, onClick, onHover, onLeave, selected, hovered, className = '' }) {
  const isActive = selected === id;
  const isHovered = hovered === id;
  return (
    <g
      className={`bone ${className} ${isActive ? 'bone-selected' : ''} ${isHovered ? 'bone-hovered' : ''}`}
      onClick={() => onClick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </g>
  );
}

export default function FullBody({ selected, hovered, onClick, onHover, onLeave }) {
  const bp = { onClick, onHover, onLeave, selected, hovered };

  const ribs = [];
  for (let i = 0; i < 12; i++) {
    const y = 188 + i * 13;
    const spread = 8 + i * 5.5;
    const curveAmount = 3 + i * 2.2;
    const leftRib = ribPath(197, y, 197 - spread, y + 2, curveAmount, 2);
    const rightRib = ribPath(203, y, 203 + spread, y + 2, curveAmount, 2);
    ribs.push(
      <g key={`rib-${i}`}>
        <path d={leftRib} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <path d={rightRib} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
      </g>
    );
  }

  const cervicalVerts = [];
  for (let i = 0; i < 7; i++) {
    cervicalVerts.push(
      <path key={`cv-${i}`} d={vertebraPath(200, 140 + i * 6.5, 7, 2.5)} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
    );
  }

  const thoracicVerts = [];
  for (let i = 0; i < 12; i++) {
    thoracicVerts.push(
      <path key={`tv-${i}`} d={vertebraPath(200, 188 + i * 13, 8, 2.8)} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
    );
  }

  const lumbarVerts = [];
  for (let i = 0; i < 5; i++) {
    lumbarVerts.push(
      <path key={`lv-${i}`} d={vertebraPath(200, 350 + i * 14, 10, 3.5)} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
    );
  }

  return (
    <svg viewBox="0 0 400 880" className="skeleton-svg">
      <defs>
        <filter id="bone-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* SKULL */}
      <Bone
        id="cranium"
        {...bp}
        d={`M 172,100
            C 162,80 158,55 165,35
            Q 175,8 200,8
            Q 225,8 235,35
            C 242,55 238,80 228,100
            L 222,100
            C 218,92 212,88 200,88
            C 188,88 182,92 178,100
            Z`}
      />
      {/* Eye sockets */}
      <g className="skull-detail" pointerEvents="none">
        <ellipse cx={188} cy={72} rx={8} ry={9} fill="#1a2332" />
        <ellipse cx={212} cy={72} rx={8} ry={9} fill="#1a2332" />
        <path d="M 196,82 L 200,94 L 204,82 Z" fill="#1a2332" />
      </g>

      <Bone
        id="mandible"
        {...bp}
        d={`M 178,102
            C 174,112 172,120 176,128
            Q 188,140 200,142
            Q 212,140 224,128
            C 228,120 226,112 222,102
            L 215,102
            C 212,112 206,118 200,120
            C 194,118 188,112 185,102
            Z`}
      />

      {/* CERVICAL SPINE */}
      <BoneGroup id="cervical_spine" {...bp}>
        {cervicalVerts}
      </BoneGroup>

      {/* THORACIC SPINE */}
      <BoneGroup id="thoracic_spine" {...bp}>
        {thoracicVerts}
      </BoneGroup>

      {/* RIBS */}
      <BoneGroup id="ribs" {...bp}>
        {ribs}
      </BoneGroup>

      {/* STERNUM */}
      <Bone
        id="sternum"
        {...bp}
        d={`M 196,178
            L 204,178
            L 205,185
            L 204,330
            L 200,336
            L 196,330
            L 195,185
            Z`}
      />

      {/* LUMBAR SPINE */}
      <BoneGroup id="lumbar_spine" {...bp}>
        {lumbarVerts}
      </BoneGroup>

      {/* SACRUM */}
      <Bone
        id="sacrum"
        {...bp}
        d={`M 186,420
            L 214,420
            L 210,450
            L 200,462
            L 190,450
            Z`}
      />

      {/* COCCYX */}
      <Bone
        id="coccyx"
        {...bp}
        d={`M 194,462
            L 206,462
            L 202,478
            L 200,482
            L 198,478
            Z`}
      />

      {/* LEFT CLAVICLE */}
      <Bone
        id="left_clavicle"
        {...bp}
        d={`M 196,175 C 180,170 160,172 138,178
            L 136,183
            C 158,178 178,176 194,180 Z`}
      />

      {/* RIGHT CLAVICLE */}
      <Bone
        id="right_clavicle"
        {...bp}
        d={`M 204,175 C 220,170 240,172 262,178
            L 264,183
            C 242,178 222,176 206,180 Z`}
      />

      {/* LEFT SCAPULA */}
      <Bone
        id="left_scapula"
        {...bp}
        d={`M 158,185
            L 148,190
            L 145,250
            L 155,275
            L 168,260
            L 166,200
            Z`}
      />

      {/* RIGHT SCAPULA */}
      <Bone
        id="right_scapula"
        {...bp}
        d={`M 242,185
            L 252,190
            L 255,250
            L 245,275
            L 232,260
            L 234,200
            Z`}
      />

      {/* LEFT HUMERUS */}
      <Bone id="left_humerus" {...bp} d={longBonePath(137, 185, 122, 345, 10, 5)} />

      {/* RIGHT HUMERUS */}
      <Bone id="right_humerus" {...bp} d={longBonePath(263, 185, 278, 345, 10, 5)} />

      {/* LEFT ULNA */}
      <Bone id="left_ulna" {...bp} d={longBonePath(120, 352, 108, 488, 7, 3.5)} />

      {/* LEFT RADIUS */}
      <Bone id="left_radius" {...bp} d={longBonePath(126, 352, 98, 488, 7, 3.5)} />

      {/* RIGHT ULNA */}
      <Bone id="right_ulna" {...bp} d={longBonePath(280, 352, 292, 488, 7, 3.5)} />

      {/* RIGHT RADIUS */}
      <Bone id="right_radius" {...bp} d={longBonePath(274, 352, 302, 488, 7, 3.5)} />

      {/* LEFT HAND */}
      <BoneGroup id="left_hand" {...bp} className="hand-clickable">
        <rect x={82} y={492} width={38} height={50} rx={5} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={1} />
        {/* Finger hints */}
        <rect x={83} y={542} width={6} height={22} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={91} y={542} width={6} height={28} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={99} y={542} width={6} height={30} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={107} y={542} width={6} height={26} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={115} y={542} width={6} height={20} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        {/* Thumb */}
        <rect x={74} y={502} width={8} height={24} rx={3} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} transform="rotate(-20, 78, 514)" />
      </BoneGroup>

      {/* RIGHT HAND */}
      <BoneGroup id="right_hand" {...bp} className="hand-clickable">
        <rect x={280} y={492} width={38} height={50} rx={5} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={1} />
        <rect x={281} y={542} width={6} height={20} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={289} y={542} width={6} height={26} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={297} y={542} width={6} height={30} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={305} y={542} width={6} height={28} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={313} y={542} width={6} height={22} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={320} y={502} width={8} height={24} rx={3} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} transform="rotate(20, 324, 514)" />
      </BoneGroup>

      {/* PELVIS */}
      <Bone
        id="pelvis"
        {...bp}
        d={`M 190,415
            C 175,410 150,415 140,435
            C 135,450 140,468 155,475
            L 170,478
            L 180,470
            L 190,468
            L 200,470
            L 210,468
            L 220,470
            L 230,478
            L 245,475
            C 260,468 265,450 260,435
            C 250,415 225,410 210,415
            L 200,418
            Z`}
      />

      {/* LEFT FEMUR */}
      <Bone id="left_femur" {...bp} d={longBonePath(168, 480, 175, 660, 13, 6)} />

      {/* RIGHT FEMUR */}
      <Bone id="right_femur" {...bp} d={longBonePath(232, 480, 225, 660, 13, 6)} />

      {/* LEFT PATELLA */}
      <Bone
        id="left_patella"
        {...bp}
        d={`M 170,662 Q 168,668 170,675 Q 175,680 180,675 Q 182,668 180,662 Q 175,658 170,662 Z`}
      />

      {/* RIGHT PATELLA */}
      <Bone
        id="right_patella"
        {...bp}
        d={`M 220,662 Q 218,668 220,675 Q 225,680 230,675 Q 232,668 230,662 Q 225,658 220,662 Z`}
      />

      {/* LEFT TIBIA */}
      <Bone id="left_tibia" {...bp} d={longBonePath(175, 682, 180, 822, 10, 5)} />

      {/* LEFT FIBULA */}
      <Bone id="left_fibula" {...bp} d={longBonePath(165, 685, 170, 822, 6, 2.5)} />

      {/* RIGHT TIBIA */}
      <Bone id="right_tibia" {...bp} d={longBonePath(225, 682, 220, 822, 10, 5)} />

      {/* RIGHT FIBULA */}
      <Bone id="right_fibula" {...bp} d={longBonePath(235, 685, 230, 822, 6, 2.5)} />

      {/* LEFT FOOT */}
      <BoneGroup id="left_foot" {...bp} className="hand-clickable">
        <path
          d={`M 165,825 L 185,825 L 190,835 L 192,855 L 158,855
              L 155,845 L 158,832 Z`}
          fill={BONE_COLOR}
          stroke={BONE_STROKE}
          strokeWidth={1}
        />
        {/* Toe hints */}
        <rect x={158} y={855} width={5} height={10} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={164} y={855} width={5} height={12} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={170} y={855} width={5} height={13} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={176} y={855} width={5} height={11} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={182} y={855} width={5} height={9} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
      </BoneGroup>

      {/* RIGHT FOOT */}
      <BoneGroup id="right_foot" {...bp} className="hand-clickable">
        <path
          d={`M 215,825 L 235,825 L 242,832 L 245,845 L 242,855
              L 208,855 L 210,835 Z`}
          fill={BONE_COLOR}
          stroke={BONE_STROKE}
          strokeWidth={1}
        />
        <rect x={212} y={855} width={5} height={9} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={218} y={855} width={5} height={11} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={224} y={855} width={5} height={13} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={230} y={855} width={5} height={12} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
        <rect x={236} y={855} width={5} height={10} rx={2} fill={BONE_COLOR} stroke={BONE_STROKE} strokeWidth={0.5} />
      </BoneGroup>

      {/* Region labels */}
      <g className="region-labels" pointerEvents="none">
        <text x={60} y={60} className="region-label skull-label">Skull</text>
        <text x={50} y={300} className="region-label spine-label">Spine</text>
        <text x={310} y={250} className="region-label ribcage-label">Ribcage</text>
        <text x={320} y={180} className="region-label shoulder-label">Shoulder</text>
        <text x={42} y={270} className="region-label arm-label">Arms</text>
        <text x={310} y={440} className="region-label forearm-label">Forearm</text>
        <text x={30} y={520} className="region-label hand-label">Hand</text>
        <text x={310} y={480} className="region-label pelvis-label">Pelvis</text>
        <text x={42} y={620} className="region-label leg-label">Legs</text>
        <text x={310} y={850} className="region-label foot-label">Feet</text>
      </g>
    </svg>
  );
}
