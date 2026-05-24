import { longBonePath } from '../utils/boneShapes';

const CARPAL_FILL = '#d4e8f7';
const CARPAL_STROKE = '#8bb8d9';
const META_FILL = '#d4f0d4';
const META_STROKE = '#82c482';
const PHALANX_FILL = '#f7e4c8';
const PHALANX_STROKE = '#d4b482';
const LABEL_COLOR = '#8899aa';

function HandBone({ id, d, type, onClick, onHover, onLeave, selected, hovered }) {
  const fills = { carpal: CARPAL_FILL, metacarpal: META_FILL, phalanx: PHALANX_FILL };
  const strokes = { carpal: CARPAL_STROKE, metacarpal: META_STROKE, phalanx: PHALANX_STROKE };
  const isActive = selected === id;
  const isHovered = hovered === id;
  return (
    <path
      d={d}
      className={`bone ${isActive ? 'bone-selected' : ''} ${isHovered ? 'bone-hovered' : ''}`}
      fill={fills[type] || PHALANX_FILL}
      stroke={strokes[type] || PHALANX_STROKE}
      strokeWidth={1.2}
      onClick={() => onClick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default function HandDetail({ selected, hovered, onClick, onHover, onLeave }) {
  const bp = { onClick, onHover, onLeave, selected, hovered };

  return (
    <svg viewBox="0 0 420 580" className="skeleton-svg hand-svg">
      <defs>
        <filter id="hand-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Forearm reference lines */}
      <g opacity={0.3}>
        <path d={longBonePath(165, 10, 155, 100, 14, 7)} fill="#c8c0b4" stroke="#a09888" strokeWidth={0.8} />
        <path d={longBonePath(205, 10, 215, 100, 14, 7)} fill="#c8c0b4" stroke="#a09888" strokeWidth={0.8} />
        <text x={145} y={55} fill={LABEL_COLOR} fontSize={10} textAnchor="end">Radius</text>
        <text x={235} y={55} fill={LABEL_COLOR} fontSize={10}>Ulna</text>
      </g>

      {/* === CARPALS (wrist bones) === */}
      {/* Proximal row */}
      <HandBone
        id="scaphoid"
        type="carpal"
        {...bp}
        d={`M 130,118 C 125,125 122,140 128,152
            C 134,160 148,160 155,152
            C 160,142 158,128 152,120
            C 146,114 136,114 130,118 Z`}
      />
      <HandBone
        id="lunate"
        type="carpal"
        {...bp}
        d={`M 160,115 C 155,122 153,135 158,148
            C 163,155 178,156 185,148
            C 190,138 190,125 185,117
            C 178,110 165,110 160,115 Z`}
      />
      <HandBone
        id="triquetrum"
        type="carpal"
        {...bp}
        d={`M 192,118 C 188,125 186,138 190,148
            C 196,156 210,157 218,150
            C 224,140 222,128 216,120
            C 210,114 198,113 192,118 Z`}
      />
      <HandBone
        id="pisiform"
        type="carpal"
        {...bp}
        d={`M 222,125 C 218,130 218,140 222,146
            C 228,152 238,150 240,142
            C 242,134 238,126 232,122
            C 228,120 224,122 222,125 Z`}
      />

      {/* Distal row */}
      <HandBone
        id="trapezium"
        type="carpal"
        {...bp}
        d={`M 112,158 C 108,165 106,178 112,190
            C 118,198 132,198 138,190
            C 144,180 142,168 136,160
            C 130,154 118,154 112,158 Z`}
      />
      <HandBone
        id="trapezoid"
        type="carpal"
        {...bp}
        d={`M 142,156 C 138,162 137,175 142,186
            C 148,194 160,194 166,186
            C 172,176 170,164 164,158
            C 158,152 148,152 142,156 Z`}
      />
      <HandBone
        id="capitate"
        type="carpal"
        {...bp}
        d={`M 170,152 C 166,160 164,175 170,190
            C 176,200 192,200 198,190
            C 204,178 202,162 196,155
            C 190,148 176,148 170,152 Z`}
      />
      <HandBone
        id="hamate"
        type="carpal"
        {...bp}
        d={`M 202,155 C 198,162 196,178 202,192
            C 208,202 224,202 232,192
            C 238,180 236,165 228,158
            C 222,152 208,150 202,155 Z`}
      />

      {/* === METACARPALS (palm bones) === */}
      {/* MC I - Thumb */}
      <HandBone
        id="metacarpal_1"
        type="metacarpal"
        {...bp}
        d={longBonePath(115, 198, 78, 280, 9, 5)}
      />
      {/* MC II - Index */}
      <HandBone
        id="metacarpal_2"
        type="metacarpal"
        {...bp}
        d={longBonePath(154, 196, 138, 310, 9, 4.5)}
      />
      {/* MC III - Middle */}
      <HandBone
        id="metacarpal_3"
        type="metacarpal"
        {...bp}
        d={longBonePath(184, 198, 180, 318, 9, 4.5)}
      />
      {/* MC IV - Ring */}
      <HandBone
        id="metacarpal_4"
        type="metacarpal"
        {...bp}
        d={longBonePath(217, 200, 222, 310, 9, 4.5)}
      />
      {/* MC V - Pinky */}
      <HandBone
        id="metacarpal_5"
        type="metacarpal"
        {...bp}
        d={longBonePath(236, 198, 256, 295, 8, 4)}
      />

      {/* === PHALANGES (finger bones) === */}

      {/* THUMB (2 phalanges) */}
      <HandBone
        id="thumb_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(74, 286, 55, 355, 7, 4)}
      />
      <HandBone
        id="thumb_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(52, 360, 40, 408, 6.5, 3.5)}
      />

      {/* INDEX FINGER (3 phalanges) */}
      <HandBone
        id="index_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(136, 316, 126, 395, 7, 3.8)}
      />
      <HandBone
        id="index_middle"
        type="phalanx"
        {...bp}
        d={longBonePath(124, 400, 118, 452, 6, 3.5)}
      />
      <HandBone
        id="index_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(116, 456, 112, 492, 5.5, 3)}
      />

      {/* MIDDLE FINGER (3 phalanges) */}
      <HandBone
        id="middle_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(179, 324, 176, 408, 7, 3.8)}
      />
      <HandBone
        id="middle_middle"
        type="phalanx"
        {...bp}
        d={longBonePath(175, 413, 173, 470, 6, 3.5)}
      />
      <HandBone
        id="middle_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(172, 474, 170, 512, 5.5, 3)}
      />

      {/* RING FINGER (3 phalanges) */}
      <HandBone
        id="ring_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(224, 316, 232, 392, 7, 3.8)}
      />
      <HandBone
        id="ring_middle"
        type="phalanx"
        {...bp}
        d={longBonePath(233, 397, 238, 448, 6, 3.5)}
      />
      <HandBone
        id="ring_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(239, 452, 242, 486, 5.5, 3)}
      />

      {/* PINKY FINGER (3 phalanges) */}
      <HandBone
        id="pinky_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(258, 300, 270, 362, 6, 3.5)}
      />
      <HandBone
        id="pinky_middle"
        type="phalanx"
        {...bp}
        d={longBonePath(272, 367, 280, 410, 5.5, 3.2)}
      />
      <HandBone
        id="pinky_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(281, 414, 286, 444, 5, 2.8)}
      />

      {/* Labels */}
      <g className="hand-labels" pointerEvents="none">
        <text x={60} y={140} fill={CARPAL_STROKE} fontSize={11} fontWeight={600}>Carpals</text>
        <text x={60} y={153} fill={LABEL_COLOR} fontSize={9}>(wrist bones)</text>

        <text x={300} y={255} fill={META_STROKE} fontSize={11} fontWeight={600}>Metacarpals</text>
        <text x={300} y={268} fill={LABEL_COLOR} fontSize={9}>(palm bones)</text>

        <text x={305} y={380} fill={PHALANX_STROKE} fontSize={11} fontWeight={600}>Phalanges</text>
        <text x={305} y={393} fill={LABEL_COLOR} fontSize={9}>(finger bones)</text>

        {/* Finger labels */}
        <text x={32} y={425} fill={LABEL_COLOR} fontSize={9} textAnchor="end">Thumb</text>
        <text x={104} y={505} fill={LABEL_COLOR} fontSize={9} textAnchor="end">Index</text>
        <text x={168} y={528} fill={LABEL_COLOR} fontSize={9} textAnchor="middle">Middle</text>
        <text x={250} y={500} fill={LABEL_COLOR} fontSize={9}>Ring</text>
        <text x={292} y={458} fill={LABEL_COLOR} fontSize={9}>Pinky</text>
      </g>

      {/* Legend */}
      <g transform="translate(10, 530)">
        <rect x={0} y={0} width={12} height={12} rx={2} fill={CARPAL_FILL} stroke={CARPAL_STROKE} />
        <text x={18} y={10} fill={LABEL_COLOR} fontSize={10}>Carpal (8 bones)</text>
        <rect x={130} y={0} width={12} height={12} rx={2} fill={META_FILL} stroke={META_STROKE} />
        <text x={148} y={10} fill={LABEL_COLOR} fontSize={10}>Metacarpal (5 bones)</text>
        <rect x={280} y={0} width={12} height={12} rx={2} fill={PHALANX_FILL} stroke={PHALANX_STROKE} />
        <text x={298} y={10} fill={LABEL_COLOR} fontSize={10}>Phalanx (14 bones)</text>
      </g>
    </svg>
  );
}
