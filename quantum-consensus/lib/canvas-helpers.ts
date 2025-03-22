/**
 * Canvas辅助函数库
 * 提供类型安全的canvas操作方法
 */

/**
 * 安全获取canvas宽度，如果canvas为null则返回fallback值
 */
export function safeCanvasWidth(canvas: HTMLCanvasElement | null, fallback: number = window.innerWidth): number {
  return canvas?.width || fallback;
}

/**
 * 安全获取canvas高度，如果canvas为null则返回fallback值
 */
export function safeCanvasHeight(canvas: HTMLCanvasElement | null, fallback: number = window.innerHeight): number {
  return canvas?.height || fallback;
}

/**
 * 调整canvas大小以匹配窗口
 */
export function resizeCanvasToWindow(canvas: HTMLCanvasElement | null): void {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 * 安全的边界检查，用于粒子动画
 */
export function checkBoundaries(
  x: number, 
  y: number, 
  canvas: HTMLCanvasElement | null, 
  callback: (hitX: boolean, hitY: boolean) => void
): void {
  const hitX = x < 0 || (canvas && x > canvas.width);
  const hitY = y < 0 || (canvas && y > canvas.height);
  callback(hitX, hitY);
}

/**
 * 清除canvas内容
 */
export function clearCanvas(ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null): void {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
} 