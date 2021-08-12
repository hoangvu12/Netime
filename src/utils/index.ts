export function numberWithCommas(x: string | number | undefined) {
  if (!x && x !== 0) return "";

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function chunk(arr: Array<any>, chunkSize: number) {
  var R = [];
  for (var i = 0; i < arr.length; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}
