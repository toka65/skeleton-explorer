import { longBonePath } from '../utils/boneShapes';

const TARSAL_FILL = '#b2ebf2';
const TARSAL_STROKE = '#4dd0e1';
const META_FILL = '#dcedc8';
const META_STROKE = '#8bc34a';
const PHALANX_FILL = '#f7e4c8';
const PHALANX_STROKE = '#d4b482';
const LABEL_COLOR = '#8899aa';

function FootBone({ id, d, type, onClick, onHover, onLeave, selected, hovered }) {
  const fills = { tarsal: TARSAL_FILL, metatarsal: META_FILL, phalanx: PHALANX_FILL };
  const strokes = { tarsal: TARSAL_STROKE, metatarsal: META_STROKE, phalanx: PHALANX_STROKE };
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

export default function FootDetail({ selected, hovered, onClick, onHover, onLeave }) {
  const bp = { onClick, onHover, onLeave, selected, hovered };

  return (
    <svg viewBox="0 0 400 580" className="skeleton-svg hand-svg">
      <defs>
        <filter id="foot-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Leg reference (tibia/fibula) */}
      <g opacity={0.3}>
        <path d={longBonePath(175, 5, 180, 60, 14, 7)} fill="#c8c0b4" stroke="#a09888" strokeWidth={0.8} />
        <path d={longBonePath(220, 5, 225, 60, 10, 5)} fill="#c8c0b4" stroke="#a09888" strokeWidth={0.8} />
        <text x={145} y={35} fill={LABEL_COLOR} fontSize={10} textAnchor="end">Tibia</text>
        <text x={255} y={35} fill={LABEL_COLOR} fontSize={10}>Fibula</text>
      </g>

      {/* === TARSALS (7 ankle/hindfoot bones) === */}

      {/* Talus - top, connects to leg */}
      <FootBone
        id="talus"
        type="tarsal"
        {...bp}
        d={`M 155,68 C 148,75 145,88 150,102
            C 156,114 172,118 188,115
            C 204,112 218,104 222,92
            C 226,80 220,70 210,66
            C 198,62 168,62 155,68 Z`}
      />

      {/* Calcaneus - large heel bone behind talus */}
      <FootBone
        id="calcaneus"
        type="tarsal"
        {...bp}
        d={`M 175,105 C 165,108 158,115 158,128
            C 158,148 162,165 170,172
            L 175,175
            L 240,175
            L 248,170
            C 255,160 258,142 255,125
            C 252,112 242,106 230,104
            C 215,100 188,102 175,105 Z`}
      />

      {/* Navicular - medial side */}
      <FootBone
        id="navicular"
        type="tarsal"
        {...bp}
        d={`M 120,110 C 114,118 112,132 118,145
            C 124,155 138,158 150,152
            C 158,146 158,133 154,120
            C 150,112 130,106 120,110 Z`}
      />

      {/* Cuboid - lateral side */}
      <FootBone
        id="cuboid"
        type="tarsal"
        {...bp}
        d={`M 232,120 C 228,128 226,142 230,160
            C 234,172 248,178 262,175
            C 272,172 278,160 276,145
            C 274,130 266,118 254,114
            C 244,112 236,114 232,120 Z`}
      />

      {/* Medial Cuneiform - inner, largest */}
      <FootBone
        id="medial_cuneiform"
        type="tarsal"
        {...bp}
        d={`M 100,148 C 95,158 94,172 100,186
            C 106,196 120,200 132,195
            C 140,190 142,178 138,165
            C 134,152 118,142 100,148 Z`}
      />

      {/* Intermediate Cuneiform - middle, smallest */}
      <FootBone
        id="intermediate_cuneiform"
        type="tarsal"
        {...bp}
        d={`M 138,148 C 134,156 133,168 138,180
            C 142,190 154,193 164,188
            C 170,183 172,172 168,160
            C 164,150 146,143 138,148 Z`}
      />

      {/* Lateral Cuneiform - outer */}
      <FootBone
        id="lateral_cuneiform"
        type="tarsal"
        {...bp}
        d={`M 170,150 C 166,158 165,172 170,186
            C 176,196 190,198 200,192
            C 208,186 210,174 206,162
            C 202,152 180,144 170,150 Z`}
      />

      {/* === METATARSALS (5 midfoot bones) === */}

      <FootBone
        id="metatarsal_1"
        type="metatarsal"
        {...bp}
        d={longBonePath(108, 200, 80, 330, 10, 5.5)}
      />
      <FootBone
        id="metatarsal_2"
        type="metatarsal"
        {...bp}
        d={longBonePath(150, 195, 130, 340, 8, 4.5)}
      />
      <FootBone
        id="metatarsal_3"
        type="metatarsal"
        {...bp}
        d={longBonePath(185, 196, 175, 345, 8, 4.5)}
      />
      <FootBone
        id="metatarsal_4"
        type="metatarsal"
        {...bp}
        d={longBonePath(230, 180, 222, 338, 8, 4.5)}
      />
      <FootBone
        id="metatarsal_5"
        type="metatarsal"
        {...bp}
        d={longBonePath(262, 178, 262, 325, 8, 4)}
      />

      {/* === PHALANGES (14 toe bones) === */}

      {/* BIG TOE (2 phalanges) */}
      <FootBone
        id="big_toe_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(77, 336, 62, 400, 8, 4.5)}
      />
      <FootBone
        id="big_toe_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(59, 405, 50, 445, 7, 4)}
      />

      {/* 2ND TOE (3 phalanges) */}
      <FootBone
        id="second_toe_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(128, 346, 118, 408, 6.5, 3.5)}
      />
      <FootBone
        id="second_toe_middle"
        type="phalanx"
        {...bp}
        d={longBonePath(116, 412, 110, 448, 5.5, 3)}
      />
      <FootBone
        id="second_toe_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(109, 452, 105, 478, 5, 2.8)}
      />

      {/* 3RD TOE (3 phalanges) */}
      <FootBone
        id="third_toe_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(174, 350, 168, 410, 6.5, 3.5)}
      />
      <FootBone
        id="third_toe_middle"
        type="phalanx"
        {...bp}
        d={longBonePath(167, 414, 164, 448, 5.5, 3)}
      />
      <FootBone
        id="third_toe_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(163, 452, 161, 476, 5, 2.8)}
      />

      {/* 4TH TOE (3 phalanges) */}
      <FootBone
        id="fourth_toe_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(222, 344, 224, 398, 6, 3.5)}
      />
      <FootBone
        id="fourth_toe_middle"
        type="phalanx"
        {...bp}
        d={longBonePath(224, 402, 228, 432, 5.5, 3)}
      />
      <FootBone
        id="fourth_toe_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(228, 436, 231, 458, 5, 2.8)}
      />

      {/* LITTLE TOE (3 phalanges) */}
      <FootBone
        id="little_toe_proximal"
        type="phalanx"
        {...bp}
        d={longBonePath(263, 330, 270, 380, 5.5, 3.2)}
      />
      <FootBone
        id="little_toe_middle"
        type="phalanx"
        {...bp}
        d={longBonePath(271, 384, 276, 410, 5, 2.8)}
      />
      <FootBone
        id="little_toe_distal"
        type="phalanx"
        {...bp}
        d={longBonePath(277, 414, 280, 436, 4.5, 2.5)}
      />

      {/* Labels */}
      <g className="hand-labels" pointerEvents="none">
        <text x={295} y={100} fill={TARSAL_STROKE} fontSize={11} fontWeight={600}>Tarsals</text>
        <text x={295} y={113} fill={LABEL_COLOR} fontSize={9}>(ankle bones)</text>

        <text x={30} y={270} fill={META_STROKE} fontSize={11} fontWeight={600}>Metatarsals</text>
        <text x={30} y={283} fill={LABEL_COLOR} fontSize={9}>(midfoot bones)</text>

        <text x={300} y={380} fill={PHALANX_STROKE} fontSize={11} fontWeight={600}>Phalanges</text>
        <text x={300} y={393} fill={LABEL_COLOR} fontSize={9}>(toe bones)</text>

        {/* Toe labels */}
        <text x={38} y={460} fill={LABEL_COLOR} fontSize={9} textAnchor="middle">Big Toe</text>
        <text x={100} y={492} fill={LABEL_COLOR} fontSize={9} textAnchor="middle">2nd</text>
        <text x={158} y={490} fill={LABEL_COLOR} fontSize={9} textAnchor="middle">3rd</text>
        <text x={236} y={472} fill={LABEL_COLOR} fontSize={9} textAnchor="middle">4th</text>
        <text x={288} y={450} fill={LABEL_COLOR} fontSize={9}>Little Toe</text>
      </g>

      {/* Legend */}
      <g transform="translate(10, 530)">
        <rect x={0} y={0} width={12} height={12} rx={2} fill={TARSAL_FILL} stroke={TARSAL_STROKE} />
        <text x={18} y={10} fill={LABEL_COLOR} fontSize={10}>Tarsal (7 bones)</text>
        <rect x={130} y={0} width={12} height={12} rx={2} fill={META_FILL} stroke={META_STROKE} />
        <text x={148} y={10} fill={LABEL_COLOR} fontSize={10}>Metatarsal (5 bones)</text>
        <rect x={290} y={0} width={12} height={12} rx={2} fill={PHALANX_FILL} stroke={PHALANX_STROKE} />
        <text x={308} y={10} fill={LABEL_COLOR} fontSize={10}>Phalanx (14 bones)</text>
      </g>
    </svg>
  );
}
