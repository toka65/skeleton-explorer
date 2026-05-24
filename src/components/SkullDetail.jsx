const CRANIAL_FILL = '#d1c4e9';
const CRANIAL_STROKE = '#7e57c2';
const FACIAL_FILL = '#ffcdd2';
const FACIAL_STROKE = '#ef5350';
const CAVITY_FILL = '#1a2332';
const LABEL_COLOR = '#8899aa';

function SkullBone({ id, d, type, onClick, onHover, onLeave, selected, hovered }) {
  const fills = { cranial: CRANIAL_FILL, facial: FACIAL_FILL };
  const strokes = { cranial: CRANIAL_STROKE, facial: FACIAL_STROKE };
  const isActive = selected === id;
  const isHovered = hovered === id;
  return (
    <path
      d={d}
      className={`bone ${isActive ? 'bone-selected' : ''} ${isHovered ? 'bone-hovered' : ''}`}
      fill={fills[type] || CRANIAL_FILL}
      stroke={strokes[type] || CRANIAL_STROKE}
      strokeWidth={1.2}
      onClick={() => onClick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default function SkullDetail({ selected, hovered, onClick, onHover, onLeave }) {
  const bp = { onClick, onHover, onLeave, selected, hovered };

  return (
    <svg viewBox="0 0 400 480" className="skeleton-svg hand-svg">
      <defs>
        <filter id="skull-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* === CRANIAL BONES === */}

      {/* Occipital - back of skull, visible as thin strips on sides */}
      <SkullBone
        id="occipital"
        type="cranial"
        {...bp}
        d={`M 108,195 C 100,170 98,140 105,110
            C 108,98 112,92 118,88
            L 112,92
            C 105,105 102,130 104,160
            C 106,180 108,192 108,195 Z
            M 292,195 C 300,170 302,140 295,110
            C 292,98 288,92 282,88
            L 288,92
            C 295,105 298,130 296,160
            C 294,180 292,192 292,195 Z`}
      />

      {/* Left Parietal - upper left side of skull */}
      <SkullBone
        id="left_parietal"
        type="cranial"
        {...bp}
        d={`M 165,22
            C 145,25 125,40 115,65
            C 108,85 105,110 108,140
            C 110,165 112,185 118,200
            L 140,195
            C 145,175 148,155 150,140
            C 152,115 155,80 160,50
            C 162,38 164,28 165,22 Z`}
      />

      {/* Right Parietal - upper right side */}
      <SkullBone
        id="right_parietal"
        type="cranial"
        {...bp}
        d={`M 235,22
            C 255,25 275,40 285,65
            C 292,85 295,110 292,140
            C 290,165 288,185 282,200
            L 260,195
            C 255,175 252,155 250,140
            C 248,115 245,80 240,50
            C 238,38 236,28 235,22 Z`}
      />

      {/* Frontal bone - forehead, center top */}
      <SkullBone
        id="frontal"
        type="cranial"
        {...bp}
        d={`M 165,22
            C 170,15 185,10 200,10
            C 215,10 230,15 235,22
            C 240,50 245,80 248,115
            C 250,135 252,155 255,172
            L 250,178
            C 245,168 235,162 225,160
            L 218,160
            L 215,170
            C 210,158 205,155 200,155
            C 195,155 190,158 185,170
            L 182,160
            L 175,160
            C 165,162 155,168 150,178
            L 145,172
            C 148,155 150,135 152,115
            C 155,80 160,50 165,22 Z`}
      />

      {/* Left Temporal - lower left side */}
      <SkullBone
        id="left_temporal"
        type="cranial"
        {...bp}
        d={`M 118,200
            C 112,185 110,165 108,140
            L 108,195
            C 105,215 104,235 106,252
            C 108,265 112,275 120,282
            L 135,278
            C 130,260 132,240 136,220
            L 140,195 Z`}
      />

      {/* Right Temporal - lower right side */}
      <SkullBone
        id="right_temporal"
        type="cranial"
        {...bp}
        d={`M 282,200
            C 288,185 290,165 292,140
            L 292,195
            C 295,215 296,235 294,252
            C 292,265 288,275 280,282
            L 265,278
            C 270,260 268,240 264,220
            L 260,195 Z`}
      />

      {/* Sphenoid - behind eyes, visible in lateral orbit walls */}
      <SkullBone
        id="sphenoid"
        type="cranial"
        {...bp}
        d={`M 145,172
            L 150,178
            C 148,186 145,195 142,205
            L 136,220
            C 132,228 130,235 130,240
            L 138,238
            C 142,225 148,215 155,210
            L 160,215
            L 155,195
            L 160,182
            L 170,178
            L 175,178
            C 178,175 180,172 182,170
            L 182,160
            L 175,160
            C 165,162 155,168 150,178
            Z
            M 255,172
            L 250,178
            C 252,186 255,195 258,205
            L 264,220
            C 268,228 270,235 270,240
            L 262,238
            C 258,225 252,215 245,210
            L 240,215
            L 245,195
            L 240,182
            L 230,178
            L 225,178
            C 222,175 220,172 218,170
            L 218,160
            L 225,160
            C 235,162 245,168 250,178
            Z`}
      />

      {/* Ethmoid - between eyes */}
      <SkullBone
        id="ethmoid"
        type="cranial"
        {...bp}
        d={`M 182,170
            L 185,170
            C 190,158 195,155 200,155
            C 205,155 210,158 215,170
            L 218,170
            L 218,195
            L 210,200
            L 205,195
            L 200,200
            L 195,195
            L 190,200
            L 182,195
            Z`}
      />

      {/* Eye socket cavities - drawn OVER the bones behind them */}
      <ellipse cx={165} cy={192} rx={22} ry={24} fill={CAVITY_FILL} opacity={0.6} pointerEvents="none" />
      <ellipse cx={235} cy={192} rx={22} ry={24} fill={CAVITY_FILL} opacity={0.6} pointerEvents="none" />

      {/* === FACIAL BONES === */}

      {/* Left Zygomatic - left cheekbone */}
      <SkullBone
        id="left_zygomatic"
        type="facial"
        {...bp}
        d={`M 138,238
            L 130,240
            C 128,250 126,260 125,268
            L 120,282
            L 135,278
            C 138,268 140,258 142,248
            L 155,245
            L 155,235
            L 155,210
            L 148,215
            C 142,225 140,232 138,238 Z`}
      />

      {/* Right Zygomatic - right cheekbone */}
      <SkullBone
        id="right_zygomatic"
        type="facial"
        {...bp}
        d={`M 262,238
            L 270,240
            C 272,250 274,260 275,268
            L 280,282
            L 265,278
            C 262,268 260,258 258,248
            L 245,245
            L 245,235
            L 245,210
            L 252,215
            C 258,225 260,232 262,238 Z`}
      />

      {/* Left Lacrimal - tiny bone at inner corner of left eye */}
      <SkullBone
        id="left_lacrimal"
        type="facial"
        {...bp}
        d={`M 182,195
            L 182,170
            L 175,178
            L 170,178
            L 160,182
            L 155,195
            L 160,215
            L 165,210
            C 170,205 175,200 182,195 Z`}
      />

      {/* Right Lacrimal - tiny bone at inner corner of right eye */}
      <SkullBone
        id="right_lacrimal"
        type="facial"
        {...bp}
        d={`M 218,195
            L 218,170
            L 225,178
            L 230,178
            L 240,182
            L 245,195
            L 240,215
            L 235,210
            C 230,205 225,200 218,195 Z`}
      />

      {/* Left Nasal bone */}
      <SkullBone
        id="left_nasal"
        type="facial"
        {...bp}
        d={`M 190,200
            L 195,195
            L 200,200
            L 200,235
            L 195,240
            L 188,228
            Z`}
      />

      {/* Right Nasal bone */}
      <SkullBone
        id="right_nasal"
        type="facial"
        {...bp}
        d={`M 210,200
            L 205,195
            L 200,200
            L 200,235
            L 205,240
            L 212,228
            Z`}
      />

      {/* Nasal cavity */}
      <path
        d={`M 188,240 L 195,242 L 200,238 L 205,242 L 212,240
            L 210,270 L 205,280 L 200,282 L 195,280 L 190,270 Z`}
        fill={CAVITY_FILL}
        opacity={0.6}
        pointerEvents="none"
      />

      {/* Vomer - nasal septum, visible through nasal cavity */}
      <SkullBone
        id="vomer"
        type="facial"
        {...bp}
        d={`M 198,238
            L 202,238
            L 202,278
            L 200,282
            L 198,278
            Z`}
      />

      {/* Left Maxilla - upper jaw left */}
      <SkullBone
        id="left_maxilla"
        type="facial"
        {...bp}
        d={`M 155,210
            L 155,245
            L 142,248
            C 140,258 138,268 135,278
            L 130,295
            C 128,305 128,315 130,325
            L 135,340
            L 155,342
            L 175,340
            L 195,338
            L 200,335
            L 200,282
            L 195,280
            L 190,270
            L 188,240
            L 188,228
            L 190,200
            L 182,195
            L 165,210 Z`}
      />

      {/* Right Maxilla - upper jaw right */}
      <SkullBone
        id="right_maxilla"
        type="facial"
        {...bp}
        d={`M 245,210
            L 245,245
            L 258,248
            C 260,258 262,268 265,278
            L 270,295
            C 272,305 272,315 270,325
            L 265,340
            L 245,342
            L 225,340
            L 205,338
            L 200,335
            L 200,282
            L 205,280
            L 210,270
            L 212,240
            L 212,228
            L 210,200
            L 218,195
            L 235,210 Z`}
      />

      {/* Teeth hint on maxilla */}
      <g pointerEvents="none" opacity={0.4}>
        {[140, 150, 160, 170, 180, 190].map((x, i) => (
          <rect key={`ut-l-${i}`} x={x} y={340} width={8} height={8} rx={1}
            fill="#f5f0e8" stroke="#d4c8b0" strokeWidth={0.5} />
        ))}
        {[210, 220, 230, 240, 250, 260].map((x, i) => (
          <rect key={`ut-r-${i}`} x={x} y={340} width={8} height={8} rx={1}
            fill="#f5f0e8" stroke="#d4c8b0" strokeWidth={0.5} />
        ))}
      </g>

      {/* Mandible - lower jaw */}
      <SkullBone
        id="skull_mandible"
        type="facial"
        {...bp}
        d={`M 130,325
            C 125,320 120,310 118,300
            C 115,288 115,278 118,270
            L 120,282
            C 118,295 120,310 125,320
            L 130,330
            L 130,345
            C 128,360 128,375 132,390
            C 138,410 155,425 175,432
            C 188,436 200,438 200,438
            C 200,438 212,436 225,432
            C 245,425 262,410 268,390
            C 272,375 272,360 270,345
            L 270,330
            L 275,320
            C 280,310 282,295 280,282
            L 282,270
            C 285,278 285,288 282,300
            C 280,310 275,320 270,325
            L 265,340
            L 245,342
            L 225,340
            L 205,338
            L 200,340
            L 195,338
            L 175,340
            L 155,342
            L 135,340
            Z`}
      />

      {/* Teeth hint on mandible */}
      <g pointerEvents="none" opacity={0.4}>
        {[140, 150, 160, 170, 180, 190].map((x, i) => (
          <rect key={`lt-l-${i}`} x={x} y={348} width={8} height={8} rx={1}
            fill="#f5f0e8" stroke="#d4c8b0" strokeWidth={0.5} />
        ))}
        {[210, 220, 230, 240, 250, 260].map((x, i) => (
          <rect key={`lt-r-${i}`} x={x} y={348} width={8} height={8} rx={1}
            fill="#f5f0e8" stroke="#d4c8b0" strokeWidth={0.5} />
        ))}
      </g>

      {/* Suture lines overlay */}
      <g pointerEvents="none" opacity={0.3}>
        {/* Coronal suture (frontal-parietal boundary) */}
        <path d="M 165,22 C 160,50 155,80 152,115 C 150,135 148,155 145,172"
          fill="none" stroke="#555" strokeWidth={1} strokeDasharray="3,2" />
        <path d="M 235,22 C 240,50 245,80 248,115 C 250,135 252,155 255,172"
          fill="none" stroke="#555" strokeWidth={1} strokeDasharray="3,2" />
        {/* Squamous suture (parietal-temporal boundary) */}
        <path d="M 118,200 L 140,195" fill="none" stroke="#555" strokeWidth={1} strokeDasharray="3,2" />
        <path d="M 282,200 L 260,195" fill="none" stroke="#555" strokeWidth={1} strokeDasharray="3,2" />
      </g>

      {/* Labels */}
      <g className="hand-labels" pointerEvents="none">
        <text x={200} y={470} fill={LABEL_COLOR} fontSize={10} textAnchor="middle">
          Front (Anterior) View — 22 bones total
        </text>

        {/* Bone type labels */}
        <text x={30} y={60} fill={CRANIAL_STROKE} fontSize={11} fontWeight={600}>Cranial Bones</text>
        <text x={30} y={73} fill={LABEL_COLOR} fontSize={9}>(8 bones — protect the brain)</text>

        <text x={310} y={310} fill={FACIAL_STROKE} fontSize={11} fontWeight={600}>Facial Bones</text>
        <text x={310} y={323} fill={LABEL_COLOR} fontSize={9}>(14 bones — shape the face)</text>

        {/* Feature labels */}
        <text x={90} y={195} fill={LABEL_COLOR} fontSize={8} textAnchor="end">Eye socket</text>
        <text x={310} y={195} fill={LABEL_COLOR} fontSize={8}>Eye socket</text>
        <text x={200} y={300} fill={LABEL_COLOR} fontSize={8} textAnchor="middle">Nasal cavity</text>
      </g>

      {/* Legend */}
      <g transform="translate(50, 448)">
        <rect x={0} y={0} width={12} height={12} rx={2} fill={CRANIAL_FILL} stroke={CRANIAL_STROKE} />
        <text x={18} y={10} fill={LABEL_COLOR} fontSize={10}>Cranial (8 bones)</text>
        <rect x={160} y={0} width={12} height={12} rx={2} fill={FACIAL_FILL} stroke={FACIAL_STROKE} />
        <text x={178} y={10} fill={LABEL_COLOR} fontSize={10}>Facial (14 bones)</text>
      </g>
    </svg>
  );
}
