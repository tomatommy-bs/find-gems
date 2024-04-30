/**
 * @example
 * - shiftArray([1, 2, 3, 4, 5], 2); // [4, 5, 1, 2, 3]
 * - shiftArray([1, 2, 3, 4, 5], -2); // [3, 4, 5, 1, 2]
 */
export function shiftArray<T>(array: T[], shift: number): T[] {
  const len = array.length;
  if (len === 0) return array; // 空の配列の場合はそのまま返す

  // 配列の長さで割った余りを計算することで、実際にシフトする回数を決定
  const effectiveShift = shift % len;
  if (effectiveShift === 0) return array; // シフト不要の場合はそのまま返す

  // 負のシフトを正のシフトに変換
  const finalShift = effectiveShift < 0 ? effectiveShift + len : effectiveShift;

  // 配列を切り分けて再配置
  return [...array.slice(-finalShift), ...array.slice(0, len - finalShift)];
}
