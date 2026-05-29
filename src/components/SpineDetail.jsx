const CERVICAL_FILL = '#bbdefb';
const CERVICAL_STROKE = '#42a5f5';
const THORACIC_FILL = '#c8e6c9';
const THORACIC_STROKE = '#66bb6a';
const LUMBAR_FILL = '#ffe0b2';
const LUMBAR_STROKE = '#ffa726';
const SACRAL_FILL = '#ffcdd2';
const SACRAL_STROKE = '#ef5350';
const FEATURE_FILL = '#cfd8dc';
const FEATURE_STROKE = '#78909c';
const LABEL_COLOR = '#8899aa';

function SpineBone({ id, d, type, onClick, onHover, onLeave, selected, hovered }) {
  const fills = {
    cervical: CERVICAL_FILL, thoracic: THORACIC_FILL,
    lumbar: LUMBAR_FILL, sacral: SACRAL_FILL, feature: FEATURE_FILL,
  };
  const strokes = {
    cervical: CERVICAL_STROKE, thoracic: THORACIC_STROKE,
    lumbar: LUMBAR_STROKE, sacral: SACRAL_STROKE, feature: FEATURE_STROKE,
  };
  const isActive = selected === id;
  const isHovered = hovered === id;
  return (
    <path
      d={d}
      className={`bone ${isActive ? 'bone-selected' : ''} ${isHovered ? 'bone-hovered' : ''}`}
      fill={fills[type]}
      stroke={strokes[type]}
      strokeWidth={1.2}
      onClick={() => onClick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    />
  );
}

function SpineBoneGroup({ id, type, children, onClick, onHover, onLeave, selected, hovered }) {
  const isActive = selected === id;
  const isHovered = hovered === id;
  return (
    <g
      className={`bone ${isActive ? 'bone-selected' : ''} ${isHovered ? 'bone-hovered' : ''}`}
      onClick={() => onClick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </g>
  );
}

// Helper: draw a single vertebra (side view) at position
function vertebra(cx, cy, bodyW, bodyH, spineLen, fill, stroke) {
  // Body (rectangular with rounded corners) + spinous process (pointer going back)
  const bx = cx - bodyW / 2;
  return (
    <g>
      {/* Vertebral body */}
      <rect x={bx} y={cy - bodyH / 2} width={bodyW} height={bodyH}
        rx={3} fill={fill} stroke={stroke} strokeWidth={1} />
      {/* Spinous process (points backward/left in side view) */}
      <path
        d={`M ${bx},${cy - bodyH * 0.3}
            L ${bx - spineLen},${cy - 1}
            L ${bx},${cy + bodyH * 0.3} Z`}
        fill={fill} stroke={stroke} strokeWidth={0.8} />
    </g>
  );
}

// Helper: disc between vertebrae
function disc(cx, cy, w, h, fill, stroke) {
  return (
    <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2}
      fill={fill} stroke={stroke} strokeWidth={0.8} />
  );
}

export default function SpineDetail({ selected, hovered, onClick, onHover, onLeave }) {
  const bp = { onClick, onHover, onLeave, selected, hovered };

  // Spine positions (lateral view, S-curve)
  // Cervical: curves forward (lordosis)
  // Thoracic: curves backward (kyphosis)
  // Lumbar: curves forward (lordosis)
  // x values shift to create the S-curve; y increases downward

  const cervicalX = [188, 190, 193, 196, 198, 200, 202]; // C1-C7
  const cervicalY = [48, 68, 88, 106, 124, 142, 160];

  const thoracicX = [202, 200, 197, 194, 191, 189, 187, 186, 186, 187, 189, 192]; // T1-T12
  const thoracicY = [182, 200, 218, 236, 254, 272, 290, 308, 326, 344, 362, 380];

  const lumbarX = [196, 200, 205, 210, 214]; // L1-L5
  const lumbarY = [402, 424, 446, 468, 490];

  // Disc positions (between vertebrae)
  const allX = [...cervicalX, ...thoracicX, ...lumbarX];
  const allY = [...cervicalY, ...thoracicY, ...lumbarY];
  const discPositions = [];
  for (let i = 0; i < allX.length - 1; i++) {
    discPositions.push({
      x: (allX[i] + allX[i + 1]) / 2,
      y: (allY[i] + allY[i + 1]) / 2,
    });
  }

  return (
    <svg viewBox="0 0 380 680" className="skeleton-svg hand-svg">
      <defs>
        <filter id="spine-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Title */}
      <text x={190} y={22} fill={LABEL_COLOR} fontSize={12} textAnchor="middle" fontWeight={600}>
        Lateral (Side) View — Looking from the Left
      </text>

      {/* Skull reference */}
      <g opacity={0.2} pointerEvents="none">
        <ellipse cx={200} cy={25} rx={35} ry={22} fill="#888" stroke="#666" strokeWidth={1} />
        <text x={248} y={28} fill={LABEL_COLOR} fontSize={9}>Skull</text>
      </g>

      {/* === INTERVERTEBRAL DISCS (drawn first, behind vertebrae) === */}
      <SpineBoneGroup id="intervertebral_disc" type="feature" {...bp}>
        {discPositions.map((pos, i) => {
          const w = i < 7 ? 22 : i < 19 ? 28 : 34;
          return (
            <ellipse key={`disc-${i}`}
              cx={pos.x} cy={pos.y}
              rx={w / 2} ry={3}
              fill={FEATURE_FILL} stroke={FEATURE_STROKE} strokeWidth={0.6} />
          );
        })}
      </SpineBoneGroup>

      {/* === CERVICAL VERTEBRAE === */}

      {/* Atlas (C1) */}
      <SpineBoneGroup id="atlas_c1" type="cervical" {...bp}>
        {/* Atlas is a ring, drawn differently */}
        <ellipse cx={cervicalX[0]} cy={cervicalY[0]} rx={16} ry={7}
          fill={CERVICAL_FILL} stroke={CERVICAL_STROKE} strokeWidth={1.2} />
        <path d={`M ${cervicalX[0] - 16},${cervicalY[0]}
          L ${cervicalX[0] - 24},${cervicalY[0] - 2}
          L ${cervicalX[0] - 16},${cervicalY[0] + 2} Z`}
          fill={CERVICAL_FILL} stroke={CERVICAL_STROKE} strokeWidth={0.8} />
      </SpineBoneGroup>

      {/* Axis (C2) */}
      <SpineBoneGroup id="axis_c2" type="cervical" {...bp}>
        {vertebra(cervicalX[1], cervicalY[1], 28, 13, 14, CERVICAL_FILL, CERVICAL_STROKE)}
        {/* Dens (odontoid process) - peg sticking up */}
        <rect x={cervicalX[1] - 3} y={cervicalY[1] - 16} width={6} height={10} rx={2}
          fill={CERVICAL_FILL} stroke={CERVICAL_STROKE} strokeWidth={0.8} />
      </SpineBoneGroup>

      {/* C3-C7 */}
      <SpineBoneGroup id="cervical_c3_c7" type="cervical" {...bp}>
        {[2, 3, 4, 5, 6].map((i) =>
          <g key={`c${i + 1}`}>
            {vertebra(cervicalX[i], cervicalY[i], 28 + i, 13, 14 + i, CERVICAL_FILL, CERVICAL_STROKE)}
          </g>
        )}
      </SpineBoneGroup>

      {/* === THORACIC VERTEBRAE === */}

      {/* T1-T4 */}
      <SpineBoneGroup id="thoracic_upper" type="thoracic" {...bp}>
        {[0, 1, 2, 3].map((i) =>
          <g key={`t${i + 1}`}>
            {vertebra(thoracicX[i], thoracicY[i], 32 + i, 14, 18 + i, THORACIC_FILL, THORACIC_STROKE)}
          </g>
        )}
      </SpineBoneGroup>

      {/* T5-T8 */}
      <SpineBoneGroup id="thoracic_middle" type="thoracic" {...bp}>
        {[4, 5, 6, 7].map((i) =>
          <g key={`t${i + 1}`}>
            {vertebra(thoracicX[i], thoracicY[i], 34 + i * 0.5, 14, 20 + i * 0.5, THORACIC_FILL, THORACIC_STROKE)}
          </g>
        )}
      </SpineBoneGroup>

      {/* T9-T12 */}
      <SpineBoneGroup id="thoracic_lower" type="thoracic" {...bp}>
        {[8, 9, 10, 11].map((i) =>
          <g key={`t${i + 1}`}>
            {vertebra(thoracicX[i], thoracicY[i], 36 + i * 0.5, 14, 22 + i * 0.3, THORACIC_FILL, THORACIC_STROKE)}
          </g>
        )}
      </SpineBoneGroup>

      {/* === LUMBAR VERTEBRAE === */}

      {/* L1-L3 */}
      <SpineBoneGroup id="lumbar_upper" type="lumbar" {...bp}>
        {[0, 1, 2].map((i) =>
          <g key={`l${i + 1}`}>
            {vertebra(lumbarX[i], lumbarY[i], 42 + i * 2, 16, 18, LUMBAR_FILL, LUMBAR_STROKE)}
          </g>
        )}
      </SpineBoneGroup>

      {/* L4-L5 */}
      <SpineBoneGroup id="lumbar_lower" type="lumbar" {...bp}>
        {[3, 4].map((i) =>
          <g key={`l${i + 1}`}>
            {vertebra(lumbarX[i], lumbarY[i], 46 + i, 16, 16, LUMBAR_FILL, LUMBAR_STROKE)}
          </g>
        )}
      </SpineBoneGroup>

      {/* === SACRUM === */}
      <SpineBone
        id="sacrum_detail"
        type="sacral"
        {...bp}
        d={`M 195,508 L 235,508
            L 238,515 L 238,525
            L 236,540 L 232,555
            L 225,568 L 218,575
            L 210,578
            L 202,575
            L 196,568
            L 192,555
            L 190,540
            L 190,525
            L 192,515
            Z`}
      />
      {/* Sacral foramina (holes) */}
      <g pointerEvents="none" opacity={0.3}>
        {[525, 540, 555, 565].map((y, i) => (
          <circle key={`sf-${i}`} cx={218 + i * 0.5} cy={y} r={2.5} fill="#1a2332" />
        ))}
      </g>

      {/* === COCCYX === */}
      <SpineBone
        id="coccyx_detail"
        type="sacral"
        {...bp}
        d={`M 204,580 L 216,580
            L 214,590 L 212,598
            L 210,604
            L 208,598
            L 206,590
            Z`}
      />

      {/* S-curve annotation */}
      <g pointerEvents="none" opacity={0.35}>
        <path d={`M 260,50 C 268,100 272,140 268,170`}
          fill="none" stroke="#42a5f5" strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={275} y={110} fill="#42a5f5" fontSize={9} fontWeight={600}>Cervical</text>
        <text x={275} y={120} fill="#42a5f5" fontSize={8}>Lordosis</text>

        <path d={`M 260,185 C 250,240 245,300 252,380`}
          fill="none" stroke="#66bb6a" strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={258} y={280} fill="#66bb6a" fontSize={9} fontWeight={600}>Thoracic</text>
        <text x={258} y={290} fill="#66bb6a" fontSize={8}>Kyphosis</text>

        <path d={`M 258,400 C 268,430 275,470 272,500`}
          fill="none" stroke="#ffa726" strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={280} y={450} fill="#ffa726" fontSize={9} fontWeight={600}>Lumbar</text>
        <text x={280} y={460} fill="#ffa726" fontSize={8}>Lordosis</text>
      </g>

      {/* Region labels (left side) */}
      <g pointerEvents="none">
        <text x={105} y={55} fill={CERVICAL_STROKE} fontSize={10} fontWeight={600} textAnchor="end">C1 — Atlas</text>
        <text x={105} y={73} fill={CERVICAL_STROKE} fontSize={10} fontWeight={600} textAnchor="end">C2 — Axis</text>
        <text x={95} y={130} fill={CERVICAL_STROKE} fontSize={10} fontWeight={600} textAnchor="end">C3–C7</text>

        <text x={85} y={195} fill={THORACIC_STROKE} fontSize={10} fontWeight={600} textAnchor="end">T1–T4</text>
        <text x={80} y={270} fill={THORACIC_STROKE} fontSize={10} fontWeight={600} textAnchor="end">T5–T8</text>
        <text x={78} y={355} fill={THORACIC_STROKE} fontSize={10} fontWeight={600} textAnchor="end">T9–T12</text>

        <text x={95} y={420} fill={LUMBAR_STROKE} fontSize={10} fontWeight={600} textAnchor="end">L1–L3</text>
        <text x={105} y={480} fill={LUMBAR_STROKE} fontSize={10} fontWeight={600} textAnchor="end">L4–L5</text>

        <text x={120} y={545} fill={SACRAL_STROKE} fontSize={10} fontWeight={600} textAnchor="end">Sacrum</text>
        <text x={120} y={598} fill={SACRAL_STROKE} fontSize={10} fontWeight={600} textAnchor="end">Coccyx</text>
      </g>

      {/* Leader lines */}
      <g pointerEvents="none" opacity={0.25}>
        <line x1={108} y1={52} x2={170} y2={48} stroke={CERVICAL_STROKE} strokeWidth={0.8} />
        <line x1={108} y1={70} x2={175} y2={68} stroke={CERVICAL_STROKE} strokeWidth={0.8} />
        <line x1={98} y1={127} x2={170} y2={124} stroke={CERVICAL_STROKE} strokeWidth={0.8} />
        <line x1={88} y1={192} x2={170} y2={190} stroke={THORACIC_STROKE} strokeWidth={0.8} />
        <line x1={83} y1={267} x2={163} y2={265} stroke={THORACIC_STROKE} strokeWidth={0.8} />
        <line x1={81} y1={352} x2={165} y2={350} stroke={THORACIC_STROKE} strokeWidth={0.8} />
        <line x1={98} y1={417} x2={175} y2={415} stroke={LUMBAR_STROKE} strokeWidth={0.8} />
        <line x1={108} y1={477} x2={190} y2={475} stroke={LUMBAR_STROKE} strokeWidth={0.8} />
        <line x1={123} y1={542} x2={188} y2={540} stroke={SACRAL_STROKE} strokeWidth={0.8} />
        <line x1={123} y1={595} x2={202} y2={592} stroke={SACRAL_STROKE} strokeWidth={0.8} />
      </g>

      {/* Vertebra count summary */}
      <text x={190} y={635} fill={LABEL_COLOR} fontSize={10} textAnchor="middle">
        33 vertebrae total: 7 cervical + 12 thoracic + 5 lumbar + 5 sacral (fused) + 3–5 coccygeal (fused)
      </text>

      {/* Legend */}
      <g transform="translate(15, 650)">
        <rect x={0} y={0} width={10} height={10} rx={2} fill={CERVICAL_FILL} stroke={CERVICAL_STROKE} />
        <text x={14} y={9} fill={LABEL_COLOR} fontSize={9}>Cervical (7)</text>
        <rect x={85} y={0} width={10} height={10} rx={2} fill={THORACIC_FILL} stroke={THORACIC_STROKE} />
        <text x={99} y={9} fill={LABEL_COLOR} fontSize={9}>Thoracic (12)</text>
        <rect x={178} y={0} width={10} height={10} rx={2} fill={LUMBAR_FILL} stroke={LUMBAR_STROKE} />
        <text x={192} y={9} fill={LABEL_COLOR} fontSize={9}>Lumbar (5)</text>
        <rect x={250} y={0} width={10} height={10} rx={2} fill={SACRAL_FILL} stroke={SACRAL_STROKE} />
        <text x={264} y={9} fill={LABEL_COLOR} fontSize={9}>Sacral (9)</text>
        <rect x={320} y={0} width={10} height={10} rx={2} fill={FEATURE_FILL} stroke={FEATURE_STROKE} />
        <text x={334} y={9} fill={LABEL_COLOR} fontSize={9}>Disc</text>
      </g>
    </svg>
  );
}
