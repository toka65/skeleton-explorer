export function longBonePath(x1, y1, x2, y2, ew = 10, sw = 4) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return '';
  const nx = -dy / len;
  const ny = dx / len;

  const pt = (t, w) => {
    const px = x1 + dx * t + nx * w;
    const py = y1 + dy * t + ny * w;
    return `${px.toFixed(1)},${py.toFixed(1)}`;
  };

  return [
    `M ${pt(0, ew)}`,
    `C ${pt(0.08, ew)} ${pt(0.12, sw)} ${pt(0.18, sw)}`,
    `L ${pt(0.82, sw)}`,
    `C ${pt(0.88, sw)} ${pt(0.92, ew)} ${pt(1, ew)}`,
    `C ${pt(1.01, ew * 0.2)} ${pt(1.01, -ew * 0.2)} ${pt(1, -ew)}`,
    `C ${pt(0.92, -ew)} ${pt(0.88, -sw)} ${pt(0.82, -sw)}`,
    `L ${pt(0.18, -sw)}`,
    `C ${pt(0.12, -sw)} ${pt(0.08, -ew)} ${pt(0, -ew)}`,
    `C ${pt(-0.01, -ew * 0.2)} ${pt(-0.01, ew * 0.2)} ${pt(0, ew)}`,
    'Z',
  ].join(' ');
}

export function ribPath(startX, startY, endX, endY, curve = 30, thickness = 3) {
  const mx = (startX + endX) / 2;
  const my = (startY + endY) / 2 + curve;
  const dx = endX - startX;
  const dy = endY - startY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = (-dy / len) * thickness;
  const ny = (dx / len) * thickness;

  return [
    `M ${startX},${startY}`,
    `Q ${mx},${my} ${endX},${endY}`,
    `L ${endX + nx},${endY + ny}`,
    `Q ${mx + nx},${my + ny} ${startX + nx},${startY + ny}`,
    'Z',
  ].join(' ');
}

export function vertebraPath(cx, cy, w = 10, h = 6) {
  return [
    `M ${cx - w},${cy}`,
    `Q ${cx - w},${cy - h} ${cx},${cy - h}`,
    `Q ${cx + w},${cy - h} ${cx + w},${cy}`,
    `Q ${cx + w},${cy + h} ${cx},${cy + h}`,
    `Q ${cx - w},${cy + h} ${cx - w},${cy}`,
    'Z',
  ].join(' ');
}

export function phalanxPath(x1, y1, x2, y2, ew = 6, sw = 3.5) {
  return longBonePath(x1, y1, x2, y2, ew, sw);
}
