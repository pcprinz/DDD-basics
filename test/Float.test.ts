import { Float, Integer } from '../src';

test('simple', () => {
  const one = Float.create(1.2, { name: 'simple.correct' });
  // const two = Float.create(3.14, { name: 'simple.wrong', min: 12 });
  // const thr = Float.fromList([1, 2, 3], { name: 'simple.thr', listSize: { max: 2 } });
  const four = Integer.fromList([1], { name: 'simple.four', listSize: { max: 2 } });

  expect(four[0]).toBeInstanceOf(Float);

  const five = Integer.toList(four);
  Float.listEquals(four, five);
});
