const BONE_FILL = '#e1bee7';
const BONE_STROKE = '#ce93d8';
const FEATURE_FILL = '#ce93d8';
const FEATURE_STROKE = '#ab47bc';
const CONNECTED_FILL = '#d1c4e9';
const CONNECTED_STROKE = '#7e57c2';
const LABEL_COLOR = '#8899aa';

function ShoulderBone({ id, d, type, onClick, onHover, onLeave, selected, hovered }) {
  const fills = {
    shoulder_bone: BONE_FILL,
    shoulder_feature: FEATURE_FILL,
    shoulder_connected: CONNECTED_FILL,
  };
  const strokes = {
    shoulder_bone: BONE_STROKE,
    shoulder_feature: FEATURE_STROKE,
    shoulder_connected: CONNECTED_STROKE,
  };
  const isActive = selected === id;
  const isHovered = hovered === id;
  return (
    <path
      d={d}
      className={`bone ${isActive ? 'bone-selected' : ''} ${isHovered ? 'bone-hovered' : ''}`}
      fill={fills[type] || BONE_FILL}
      stroke={strokes[type] || BONE_STROKE}
      strokeWidth={1.2}
      onClick={() => onClick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default function ShoulderDetail({ selected, hovered, onClick, onHover, onLeave }) {
  const bp = { onClick, onHover, onLeave, selected, hovered };

  return (
    <svg viewBox="0 0 420 460" className="skeleton-svg hand-svg">
      <defs>
        <filter id="shoulder-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Title label */}
      <text x={210} y={25} fill={LABEL_COLOR} fontSize={12} textAnchor="middle" fontWeight={600}>
        Right Shoulder — Anterior (Front) View
      </text>

      {/* Rib cage reference (background) */}
      <g opacity={0.15} pointerEvents="none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={`rib-${i}`}
            d={`M 30,${155 + i * 35} Q 80,${170 + i * 35} 130,${160 + i * 35}`}
            fill="none"
            stroke="#888"
            strokeWidth={2}
          />
        ))}
      </g>

      {/* === MANUBRIUM (top of sternum) === */}
      <ShoulderBone
        id="manubrium"
        type="shoulder_connected"
        {...bp}
        d={`M 20,115 L 55,108 L 58,118
            L 60,155 L 55,180
            L 35,182 L 25,175
            L 22,155 Z`}
      />

      {/* === SCAPULA BODY (main triangular blade) === */}
      <ShoulderBone
        id="shoulder_scapula_body"
        type="shoulder_bone"
        {...bp}
        d={`M 195,108
            L 210,115
            C 215,120 218,130 220,140
            L 230,155
            L 235,170
            L 232,190
            L 225,210
            L 215,245
            L 205,280
            L 195,310
            L 185,330
            L 175,338
            L 168,335
            L 165,325
            L 168,300
            L 172,275
            L 178,245
            L 182,220
            L 184,195
            L 185,170
            L 185,148
            L 188,130
            Z`}
      />

      {/* === SPINE OF SCAPULA (ridge across back) === */}
      <ShoulderBone
        id="scapular_spine"
        type="shoulder_feature"
        {...bp}
        d={`M 188,130
            L 195,108
            L 210,115
            C 215,120 218,128 220,138
            L 245,125
            L 268,118
            L 272,122
            L 270,132
            L 250,138
            L 230,145
            L 220,148
            C 218,152 215,155 212,158
            L 200,155
            L 190,148
            L 185,140 Z`}
      />

      {/* === ACROMION (point of shoulder) === */}
      <ShoulderBone
        id="acromion"
        type="shoulder_feature"
        {...bp}
        d={`M 268,118
            L 290,108
            L 310,102
            L 325,100
            L 332,104
            L 330,112
            L 318,118
            L 300,125
            L 282,132
            L 272,135
            L 270,132
            L 268,125
            Z`}
      />

      {/* === CORACOID PROCESS (hook projection) === */}
      <ShoulderBone
        id="coracoid_process"
        type="shoulder_feature"
        {...bp}
        d={`M 230,145
            L 240,138
            L 255,132
            L 270,132
            L 278,138
            L 280,148
            L 275,155
            L 265,158
            L 255,155
            L 245,150
            L 238,148
            Z`}
      />

      {/* === GLENOID CAVITY (shoulder socket) === */}
      <ShoulderBone
        id="glenoid_cavity"
        type="shoulder_feature"
        {...bp}
        d={`M 230,155
            L 235,170
            L 232,190
            L 228,210
            L 225,215
            L 220,212
            L 218,195
            L 220,175
            L 222,160
            L 225,152
            Z`}
      />

      {/* === CLAVICLE (collarbone, S-shaped) === */}
      <ShoulderBone
        id="shoulder_clavicle"
        type="shoulder_bone"
        {...bp}
        d={`M 55,108
            C 65,102 85,96 110,92
            C 140,88 170,86 200,88
            C 230,90 260,96 280,102
            L 310,102
            L 325,100
            L 332,104
            L 330,112
            L 310,114
            L 282,114
            C 260,110 235,106 210,104
            C 185,102 160,104 135,108
            C 110,112 85,118 70,122
            L 58,118
            Z`}
      />

      {/* === HUMERUS HEAD (ball of upper arm) === */}
      <ShoulderBone
        id="humerus_head"
        type="shoulder_connected"
        {...bp}
        d={`M 268,168
            C 275,155 290,145 308,142
            C 325,140 340,145 348,158
            C 355,170 355,188 348,205
            C 342,218 332,228 318,232
            L 310,250
            L 305,275
            L 300,310
            L 298,340
            L 296,370
            L 288,372
            L 282,370
            L 280,340
            L 282,310
            L 285,275
            L 288,250
            L 278,235
            C 262,225 255,210 255,195
            C 255,180 260,172 268,168
            Z`}
      />

      {/* Humerus shaft reference (fading out) */}
      <g opacity={0.25} pointerEvents="none">
        <path
          d={`M 296,370 L 294,400 L 292,430 L 286,432 L 284,400 L 282,370`}
          fill="#c8b8d8"
          stroke="#a090b0"
          strokeWidth={0.8}
        />
        <text x={302} y={420} fill={LABEL_COLOR} fontSize={9}>Humerus shaft</text>
      </g>

      {/* Joint areas - dashed circles showing joints */}
      <g pointerEvents="none" opacity={0.3}>
        {/* Sternoclavicular joint */}
        <circle cx={57} cy={113} r={12} fill="none" stroke="#ffd700" strokeWidth={1.5} strokeDasharray="3,2" />
        <text x={20} y={100} fill="#ffd700" fontSize={8}>SC Joint</text>

        {/* Acromioclavicular joint */}
        <circle cx={325} cy={107} r={10} fill="none" stroke="#ffd700" strokeWidth={1.5} strokeDasharray="3,2" />
        <text x={340} y={100} fill="#ffd700" fontSize={8}>AC Joint</text>

        {/* Glenohumeral joint */}
        <ellipse cx={275} cy={190} rx={18} ry={22} fill="none" stroke="#ffd700" strokeWidth={1.5} strokeDasharray="3,2" />
        <text x={225} y={240} fill="#ffd700" fontSize={8}>GH Joint</text>
      </g>

      {/* Labels */}
      <g className="hand-labels" pointerEvents="none">
        <text x={30} y={55} fill={BONE_STROKE} fontSize={11} fontWeight={600}>Main Bones</text>
        <text x={30} y={68} fill={LABEL_COLOR} fontSize={9}>(clavicle &amp; scapula)</text>

        <text x={310} y={55} fill={FEATURE_STROKE} fontSize={11} fontWeight={600}>Bone Features</text>
        <text x={310} y={68} fill={LABEL_COLOR} fontSize={9}>(parts of the scapula)</text>
      </g>

      {/* Legend */}
      <g transform="translate(20, 430)">
        <rect x={0} y={0} width={12} height={12} rx={2} fill={BONE_FILL} stroke={BONE_STROKE} />
        <text x={16} y={10} fill={LABEL_COLOR} fontSize={9}>Main bones</text>
        <rect x={100} y={0} width={12} height={12} rx={2} fill={FEATURE_FILL} stroke={FEATURE_STROKE} />
        <text x={116} y={10} fill={LABEL_COLOR} fontSize={9}>Scapula features</text>
        <rect x={220} y={0} width={12} height={12} rx={2} fill={CONNECTED_FILL} stroke={CONNECTED_STROKE} />
        <text x={236} y={10} fill={LABEL_COLOR} fontSize={9}>Connected bones</text>
        <circle cx={336} cy={6} r={5} fill="none" stroke="#ffd700" strokeWidth={1.2} strokeDasharray="2,1" />
        <text x={345} y={10} fill={LABEL_COLOR} fontSize={9}>Joints</text>
      </g>
    </svg>
  );
}
