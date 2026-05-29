const STERNUM_FILL = '#ffe0b2';
const STERNUM_STROKE = '#ffb74d';
const TRUE_RIB_FILL = '#c8e6c9';
const TRUE_RIB_STROKE = '#81c784';
const FALSE_RIB_FILL = '#b2ebf2';
const FALSE_RIB_STROKE = '#4dd0e1';
const FLOATING_RIB_FILL = '#e1bee7';
const FLOATING_RIB_STROKE = '#ce93d8';
const CARTILAGE_FILL = '#cfd8dc';
const CARTILAGE_STROKE = '#90a4ae';
const LABEL_COLOR = '#8899aa';

function RibBone({ id, d, type, onClick, onHover, onLeave, selected, hovered }) {
  const fills = {
    sternum: STERNUM_FILL, true_rib: TRUE_RIB_FILL,
    false_rib: FALSE_RIB_FILL, floating_rib: FLOATING_RIB_FILL,
    cartilage: CARTILAGE_FILL,
  };
  const strokes = {
    sternum: STERNUM_STROKE, true_rib: TRUE_RIB_STROKE,
    false_rib: FALSE_RIB_STROKE, floating_rib: FLOATING_RIB_STROKE,
    cartilage: CARTILAGE_STROKE,
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

function RibBoneGroup({ id, type, children, onClick, onHover, onLeave, selected, hovered }) {
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

// Front-view rib: curves out from spine, arcs downward, ends near the sternum/cartilage
function ribPath(cx, y, reach, dropY, side) {
  const dir = side === 'left' ? -1 : 1;
  const endX = cx + reach * dir;
  // Ribs curve outward then sweep back in toward the front
  // Control points create a nice arc that bows outward
  return `M ${cx + 12 * dir},${y}
    C ${cx + reach * 0.5 * dir},${y - 6}
      ${cx + reach * 1.05 * dir},${y + dropY * 0.35}
      ${endX},${y + dropY}`;
}

export default function RibcageDetail({ selected, hovered, onClick, onHover, onLeave }) {
  const bp = { onClick, onHover, onLeave, selected, hovered };
  const cx = 210;

  // Rib layout data — front (anterior) view
  // Each rib pair fans out from the spine and curves down to meet the sternum/cartilage
  const ribData = [
    { num: 1,  y: 52,  reach: 62,  drop: 2,   type: 'true_rib' },
    { num: 2,  y: 72,  reach: 78,  drop: 4,   type: 'true_rib' },
    { num: 3,  y: 94,  reach: 92,  drop: 6,   type: 'true_rib' },
    { num: 4,  y: 116, reach: 104, drop: 9,   type: 'true_rib' },
    { num: 5,  y: 138, reach: 114, drop: 12,  type: 'true_rib' },
    { num: 6,  y: 160, reach: 120, drop: 16,  type: 'true_rib' },
    { num: 7,  y: 182, reach: 122, drop: 20,  type: 'true_rib' },
    { num: 8,  y: 204, reach: 118, drop: 22,  type: 'false_rib' },
    { num: 9,  y: 224, reach: 108, drop: 22,  type: 'false_rib' },
    { num: 10, y: 244, reach: 94,  drop: 20,  type: 'false_rib' },
    { num: 11, y: 264, reach: 72,  drop: 14,  type: 'floating_rib' },
    { num: 12, y: 280, reach: 54,  drop: 10,  type: 'floating_rib' },
  ];

  const fills = {
    true_rib: TRUE_RIB_FILL, false_rib: FALSE_RIB_FILL,
    floating_rib: FLOATING_RIB_FILL,
  };
  const strokes = {
    true_rib: TRUE_RIB_STROKE, false_rib: FALSE_RIB_STROKE,
    floating_rib: FLOATING_RIB_STROKE,
  };

  return (
    <svg viewBox="0 0 420 420" className="skeleton-svg hand-svg">
      <defs>
        <filter id="ribcage-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <text x={cx} y={18} fill={LABEL_COLOR} fontSize={11} textAnchor="middle" fontWeight={600}>
        Anterior (Front) View
      </text>

      {/* Spine reference (behind everything) */}
      <g opacity={0.12} pointerEvents="none">
        <rect x={cx - 6} y={38} width={12} height={265} rx={4} fill="#888" stroke="#666" strokeWidth={0.8} />
      </g>

      {/* === COSTAL CARTILAGE (drawn first, behind ribs and sternum) === */}
      <RibBoneGroup id="costal_cartilage" type="cartilage" {...bp}>
        {ribData.slice(0, 10).map((rib) => {
          const sternumEdge = 11;
          return ['left', 'right'].map((side) => {
            const dir = side === 'left' ? -1 : 1;
            const ribEndX = cx + rib.reach * dir;
            const ribEndY = rib.y + rib.drop;
            const cartEndX = cx + sternumEdge * dir;
            // Cartilage curves down from rib end to sternum edge
            const cartEndY = rib.num <= 7
              ? rib.y + rib.drop + rib.num * 2
              : rib.y + rib.drop + 14 + (rib.num - 7) * 5;
            return (
              <path key={`cart-${rib.num}-${side}`}
                d={`M ${ribEndX},${ribEndY}
                    Q ${(ribEndX + cartEndX) / 2},${(ribEndY + cartEndY) / 2 + 4}
                      ${cartEndX},${cartEndY}`}
                fill="none" stroke={CARTILAGE_STROKE} strokeWidth={2.5}
                strokeLinecap="round" opacity={0.5}
              />
            );
          });
        })}
      </RibBoneGroup>

      {/* === RIBS (drawn as pairs, each rib pair is one clickable unit) === */}
      {ribData.map((rib) => {
        const id = `rib_${rib.num}`;
        const isActive = selected === id;
        const isHov = hovered === id;
        const fill = fills[rib.type];
        const stroke = strokes[rib.type];

        return (
          <g key={id}
            className={`bone ${isActive ? 'bone-selected' : ''} ${isHov ? 'bone-hovered' : ''}`}
            onClick={() => onClick(id)}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={onLeave}
            style={{ cursor: 'pointer' }}
          >
            {['left', 'right'].map((side) => (
              <g key={`${id}-${side}`}>
                {/* Outer stroke */}
                <path
                  d={ribPath(cx, rib.y, rib.reach, rib.drop, side)}
                  fill="none" stroke={stroke} strokeWidth={5}
                  strokeLinecap="round"
                />
                {/* Inner fill */}
                <path
                  d={ribPath(cx, rib.y, rib.reach, rib.drop, side)}
                  fill="none" stroke={fill} strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>
        );
      })}

      {/* === STERNUM (drawn on top of ribs) === */}

      {/* Manubrium */}
      <RibBone id="manubrium_rib" type="sternum" {...bp}
        d={`M ${cx - 14},${46}
            Q ${cx - 15},${44} ${cx - 10},${42}
            L ${cx + 10},${42}
            Q ${cx + 15},${44} ${cx + 14},${46}
            L ${cx + 12},${72}
            L ${cx - 12},${72}
            Z`}
      />

      {/* Sternal Body */}
      <RibBone id="sternal_body" type="sternum" {...bp}
        d={`M ${cx - 12},${74}
            L ${cx + 12},${74}
            L ${cx + 10},${196}
            L ${cx - 10},${196}
            Z`}
      />

      {/* Xiphoid Process */}
      <RibBone id="xiphoid_process" type="sternum" {...bp}
        d={`M ${cx - 7},${198}
            L ${cx + 7},${198}
            L ${cx + 3},${210}
            L ${cx},${218}
            L ${cx - 3},${210}
            Z`}
      />

      {/* Jugular notch detail */}
      <g pointerEvents="none" opacity={0.35}>
        <path d={`M ${cx - 6},${42} Q ${cx},${47} ${cx + 6},${42}`}
          fill="none" stroke={STERNUM_STROKE} strokeWidth={0.8} />
      </g>

      {/* Sternal angle marker (where manubrium meets body) */}
      <g pointerEvents="none" opacity={0.25}>
        <line x1={cx - 14} y1={73} x2={cx + 14} y2={73} stroke={STERNUM_STROKE} strokeWidth={0.8} strokeDasharray="2,2" />
      </g>

      {/* === LABELS === */}
      <g pointerEvents="none">
        {/* Rib number labels - left side */}
        {ribData.map((rib) => {
          const labelX = cx - rib.reach - 12;
          const labelY = rib.y + rib.drop * 0.4 + 3;
          const col = strokes[rib.type];
          return (
            <text key={`lbl-${rib.num}`} x={labelX} y={labelY}
              fill={col} fontSize={9} fontWeight={600} textAnchor="end">
              {rib.num}
            </text>
          );
        })}

        {/* Sternum part labels - right side with leader lines */}
        <line x1={cx + 16} y1={56} x2={cx + 28} y2={56} stroke={STERNUM_STROKE} strokeWidth={0.5} opacity={0.4} />
        <text x={cx + 30} y={60} fill={STERNUM_STROKE} fontSize={8.5} fontWeight={600}>Manubrium</text>

        <line x1={cx + 14} y1={135} x2={cx + 28} y2={135} stroke={STERNUM_STROKE} strokeWidth={0.5} opacity={0.4} />
        <text x={cx + 30} y={139} fill={STERNUM_STROKE} fontSize={8.5} fontWeight={600}>Sternal Body</text>

        <line x1={cx + 8} y1={208} x2={cx + 28} y2={208} stroke={STERNUM_STROKE} strokeWidth={0.5} opacity={0.4} />
        <text x={cx + 30} y={212} fill={STERNUM_STROKE} fontSize={8.5} fontWeight={600}>Xiphoid</text>

        {/* Region bracket labels on far left */}
        <g opacity={0.5}>
          {/* True ribs bracket */}
          <line x1={36} y1={53} x2={36} y2={200} stroke={TRUE_RIB_STROKE} strokeWidth={1.2} />
          <line x1={33} y1={53} x2={39} y2={53} stroke={TRUE_RIB_STROKE} strokeWidth={1.2} />
          <line x1={33} y1={200} x2={39} y2={200} stroke={TRUE_RIB_STROKE} strokeWidth={1.2} />
          <text x={31} y={130} fill={TRUE_RIB_STROKE} fontSize={8} fontWeight={600}
            textAnchor="end" transform="rotate(-90, 31, 130)">True Ribs (1–7)</text>

          {/* False ribs bracket */}
          <line x1={42} y1={206} x2={42} y2={266} stroke={FALSE_RIB_STROKE} strokeWidth={1.2} />
          <line x1={39} y1={206} x2={45} y2={206} stroke={FALSE_RIB_STROKE} strokeWidth={1.2} />
          <line x1={39} y1={266} x2={45} y2={266} stroke={FALSE_RIB_STROKE} strokeWidth={1.2} />
          <text x={37} y={240} fill={FALSE_RIB_STROKE} fontSize={8} fontWeight={600}
            textAnchor="end" transform="rotate(-90, 37, 240)">False (8–10)</text>

          {/* Floating ribs bracket */}
          <line x1={48} y1={268} x2={48} y2={292} stroke={FLOATING_RIB_STROKE} strokeWidth={1.2} />
          <line x1={45} y1={268} x2={51} y2={268} stroke={FLOATING_RIB_STROKE} strokeWidth={1.2} />
          <line x1={45} y1={292} x2={51} y2={292} stroke={FLOATING_RIB_STROKE} strokeWidth={1.2} />
          <text x={43} y={284} fill={FLOATING_RIB_STROKE} fontSize={7.5} fontWeight={600}
            textAnchor="end" transform="rotate(-90, 43, 284)">Floating</text>
        </g>
      </g>

      {/* Organ silhouettes (very subtle, educational) */}
      <g pointerEvents="none" opacity={0.06}>
        {/* Heart silhouette */}
        <path d={`M ${cx - 8},${105}
          C ${cx - 28},${90} ${cx - 35},${115} ${cx - 5},${140}
          M ${cx - 8},${105}
          C ${cx + 12},${90} ${cx + 20},${115} ${cx - 5},${140}`}
          fill="#ff6b6b" stroke="none" />
        {/* Lung silhouettes */}
        <ellipse cx={cx - 50} cy={120} rx={35} ry={50} fill="#64b5f6" />
        <ellipse cx={cx + 50} cy={120} rx={35} ry={50} fill="#64b5f6" />
      </g>

      {/* Summary */}
      <text x={cx} y={330} fill={LABEL_COLOR} fontSize={9.5} textAnchor="middle">
        24 ribs total: 14 true + 6 false + 4 floating (shown as 12 pairs)
      </text>

      {/* Legend */}
      <g transform="translate(18, 350)">
        <rect x={0} y={0} width={10} height={10} rx={2} fill={STERNUM_FILL} stroke={STERNUM_STROKE} />
        <text x={14} y={9} fill={LABEL_COLOR} fontSize={8.5}>Sternum</text>
        <rect x={68} y={0} width={10} height={10} rx={2} fill={TRUE_RIB_FILL} stroke={TRUE_RIB_STROKE} />
        <text x={82} y={9} fill={LABEL_COLOR} fontSize={8.5}>True (1–7)</text>
        <rect x={152} y={0} width={10} height={10} rx={2} fill={FALSE_RIB_FILL} stroke={FALSE_RIB_STROKE} />
        <text x={166} y={9} fill={LABEL_COLOR} fontSize={8.5}>False (8–10)</text>
        <rect x={242} y={0} width={10} height={10} rx={2} fill={FLOATING_RIB_FILL} stroke={FLOATING_RIB_STROKE} />
        <text x={256} y={9} fill={LABEL_COLOR} fontSize={8.5}>Floating (11–12)</text>
        <rect x={345} y={0} width={10} height={10} rx={2} fill={CARTILAGE_FILL} stroke={CARTILAGE_STROKE} />
        <text x={359} y={9} fill={LABEL_COLOR} fontSize={8.5}>Cartilage</text>
      </g>
    </svg>
  );
}
