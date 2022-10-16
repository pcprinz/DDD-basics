import { PlainDate, PlainDateTime, PlainTime, Timestamp } from '../src';

const logs: { name: string; item: any }[] = [];

function log(name: string, item: any) {
  logs.push({ name, item });
}

afterAll(() => {
  // console.log(
  //   'LOGS:\n' + logs.map((data) => `${data.name}:\t ${JSON.stringify(data.item)}`).join('\n')
  // );
});

test('PlainDate', () => {
  log('Date[3]', PlainDate.create([2021, 1, 3]));
  log('Date[2]', PlainDate.create([2021, 1]));
  log('Date[1]', PlainDate.create([2021]));
  log('Date{3}', PlainDate.create({ year: 2021, month: 1, date: 3 }));
  log('Date{2}', PlainDate.create({ year: 2021, month: 3 }));
  log('Date{1}', PlainDate.create({ year: 2021 }));
  log('Date"3.1"', PlainDate.create('03.02.2021'));
  log('Date"3.2"', PlainDate.create('3.02.2021'));
  log('Date"3.3"', PlainDate.create('3.2.2021'));
  log('Date"3.4"', PlainDate.create('2021-02-03'));
  log('Date"3.5"', PlainDate.create('2021-02-3'));
  log('Date"3.6"', PlainDate.create('2021-2-3'));
});

test('PlainTime', () => {
  log('Time[4]', PlainTime.create([3, 4, 5, 6]));
  log('Time[3]', PlainTime.create([3, 4, 5]));
  log('Time[2]', PlainTime.create([3, 4]));
  log('Time[1]', PlainTime.create([3]));
  log('Time{4}', PlainTime.create({ hours: 3, minutes: 4, seconds: 5, milliseconds: 6 }));
  log('Time{3}', PlainTime.create({ hours: 3, minutes: 4, seconds: 5 }));
  log('Time{2}', PlainTime.create({ hours: 3, minutes: 4 }));
  log('Time{1}', PlainTime.create({ hours: 3 }));
  log('Time"1.1"', PlainTime.create('03'));
  log('Time"1.2"', PlainTime.create('3'));
  log('Time"2.1"', PlainTime.create('03:04'));
  log('Time"2.2"', PlainTime.create('3:04'));
  log('Time"3.1"', PlainTime.create('03:04:05'));
  log('Time"3.2"', PlainTime.create('3:04:05'));
  log('Time"4.1"', PlainTime.create('03:04:05.006'));
  log('Time"4.2"', PlainTime.create('3:04:05.006'));
  log('Time"4.3"', PlainTime.create('3:04:05.1'));
  log('Time"5.1"', PlainTime.create('02:00:05+01:04'));
  log('Time"5.2"', PlainTime.create('2:00:05+01:04'));
});

test('PlainDateTime', () => {
  log('DaTi[7]', PlainDateTime.create([2021, 1, 1, 3, 4, 5, 6]));
  log('DaTi[6]', PlainDateTime.create([2021, 1, 1, 3, 4, 5]));
  log('DaTi[5]', PlainDateTime.create([2021, 1, 1, 3, 4]));
  log('DaTi[4]', PlainDateTime.create([2021, 1, 1, 3]));
  log('DaTi[3]', PlainDateTime.create([2021, 1, 1]));
  log('DaTi[2]', PlainDateTime.create([2021, 1]));
  log('DaTi[1]', PlainDateTime.create([2021]));
  log(
    'DaTi{7}',
    PlainDateTime.create({
      year: 2021,
      month: 1,
      date: 1,
      hours: 3,
      minutes: 4,
      seconds: 5,
      milliseconds: 6,
    })
  );
  log(
    'DaTi{6}',
    PlainDateTime.create({ year: 2021, month: 1, date: 1, hours: 3, minutes: 4, seconds: 5 })
  );
  log('DaTi{5}', PlainDateTime.create({ year: 2021, month: 1, date: 1, hours: 3, minutes: 4 }));
  log('DaTi{4}', PlainDateTime.create({ year: 2021, month: 1, date: 1, hours: 3 }));
  log('DaTi{3}', PlainDateTime.create({ year: 2021, month: 1, date: 1 }));
  log('DaTi{2}', PlainDateTime.create({ year: 2021, month: 1 }));
  log('DaTi{1}', PlainDateTime.create({ year: 2021 }));
  log('DaTi"7.1"', PlainDateTime.create('01.01.2021T03:04:05.06'));
  log('DaTi"6.1"', PlainDateTime.create('01.01.2021T03:04:05'));
  log('DaTi"5.1"', PlainDateTime.create('01.01.2021T03:04'));
  log('DaTi"4.1"', PlainDateTime.create('01.01.2021T03'));
  log('DaTi"3.1"', PlainDateTime.create('01.01.2021'));
  log('DaTi"7.2"', PlainDateTime.create('2021-01-01T03:04:05.06'));
  log('DaTi"6.2"', PlainDateTime.create('2021-01-01T03:04:05'));
  log('DaTi"5.2"', PlainDateTime.create('2021-01-01T03:04'));
  log('DaTi"4.2"', PlainDateTime.create('2021-01-01T03'));
  log('DaTi"3.2"', PlainDateTime.create('2021-01-01'));
  log('DaTi"ISO"', PlainDateTime.create('Fri, 01 Oct 2021 01:34:05 +0130'));
});

test('now', () => {
  log('NOW7', PlainDateTime.now({ density: 'YMDHMSs' }));
  log('NOW6', PlainDateTime.now({ density: 'YMDHMS' }));
  log('NOW5', PlainDateTime.now({ density: 'YMDHM' }));
  log('NOW4', PlainDateTime.now({ density: 'YMDH' }));
  log('NOW3', PlainDateTime.now({ density: 'YMD' }));
  log('NOW2', PlainDateTime.now({ density: 'YM' }));
  log('NOW1', PlainDateTime.now({ density: 'Y' }));
});

test('offset', () => {
  log('OFFSET7.1', PlainDateTime.now().createOffset({ year: -1 }));
  log('OFFSET7.2', PlainDateTime.now().createOffset({ month: -12 }));
  log('OFFSET6', PlainDateTime.now().createOffset({ month: -1 }));
  log('OFFSET5', PlainDateTime.now().createOffset({ date: -1 }));
  log('OFFSET4', PlainDateTime.now().createOffset({ hours: -1 }));
  log('OFFSET3', PlainDateTime.now().createOffset({ minutes: -1 }));
  log('OFFSET2', PlainDateTime.now().createOffset({ seconds: -1 }));
  log('OFFSET1', PlainDateTime.now().createOffset({ milliseconds: -(24 * 60 * 60 * 1000) }));
});

test('compare', () => {
  log(
    'COMP1',
    PlainDateTime.create('Thu, 23 Sep 2021 10:33:00 +0200').compare(
      PlainDateTime.now().createOffset({ month: -1 })
    )
  );
});

test('createOffset', () => {
  const dt = PlainDateTime.create('01.01.2020T10:00:00');
  expect(dt.year).toBe(2020);
  expect(dt.month).toBe(0);
  expect(dt.date).toBe(1);
  expect(dt.hours).toBe(10);
  expect(dt.minutes).toBe(0);
  expect(dt.seconds).toBe(0);

  const year = dt.createOffset({ year: 4 });
  expect(year.year).toBe(2024);
  expect(year.month).toBe(0);
  expect(year.date).toBe(1);
  expect(year.hours).toBe(10);
  expect(year.minutes).toBe(0);
  expect(year.seconds).toBe(0);

  const month = dt.createOffset({ month: 5 });
  expect(month.year).toBe(2020);
  expect(month.month).toBe(5);
  expect(month.date).toBe(1);
  expect(month.hours).toBe(10);
  expect(month.minutes).toBe(0);
  expect(month.seconds).toBe(0);

  const date = dt.createOffset({ date: 16 });
  expect(date.year).toBe(2020);
  expect(date.month).toBe(0);
  expect(date.date).toBe(17);
  expect(date.hours).toBe(10);
  expect(date.minutes).toBe(0);
  expect(date.seconds).toBe(0);

  const hour = dt.createOffset({ hours: 9 });
  expect(hour.year).toBe(2020);
  expect(hour.month).toBe(0);
  expect(hour.date).toBe(1);
  expect(hour.hours).toBe(19);
  expect(hour.minutes).toBe(0);
  expect(hour.seconds).toBe(0);

  const minute = dt.createOffset({ minutes: 40 });
  expect(minute.year).toBe(2020);
  expect(minute.month).toBe(0);
  expect(minute.date).toBe(1);
  expect(minute.hours).toBe(10);
  expect(minute.minutes).toBe(40);
  expect(minute.seconds).toBe(0);

  const second = dt.createOffset({ seconds: 25 });
  expect(second.year).toBe(2020);
  expect(second.month).toBe(0);
  expect(second.date).toBe(1);
  expect(second.hours).toBe(10);
  expect(second.minutes).toBe(0);
  expect(second.seconds).toBe(25);

  const combined = dt.createOffset({
    year: -3,
    month: -5,
    date: -2,
    hours: -7,
    minutes: -12,
    seconds: -9,
  });
  expect(combined.year).toBe(2016);
  expect(combined.month).toBe(6);
  expect(combined.date).toBe(30);
  expect(combined.hours).toBe(2);
  expect(combined.minutes).toBe(47);
  expect(combined.seconds).toBe(51);
});

test('createSet', () => {
  const dt = PlainDateTime.create('01.01.2020T10:00:00');
  expect(dt.year).toBe(2020);
  expect(dt.month).toBe(0);
  expect(dt.date).toBe(1);
  expect(dt.hours).toBe(10);
  expect(dt.minutes).toBe(0);
  expect(dt.seconds).toBe(0);

  const year = dt.createSet({ year: 4 });
  expect(year.year).toBe(4);
  expect(year.month).toBe(0);
  expect(year.date).toBe(1);
  expect(year.hours).toBe(10);
  expect(year.minutes).toBe(0);
  expect(year.seconds).toBe(0);

  const month = dt.createSet({ month: 5 });
  expect(month.year).toBe(2020);
  expect(month.month).toBe(5);
  expect(month.date).toBe(1);
  expect(month.hours).toBe(10);
  expect(month.minutes).toBe(0);
  expect(month.seconds).toBe(0);

  const date = dt.createSet({ date: 16 });
  expect(date.year).toBe(2020);
  expect(date.month).toBe(0);
  expect(date.date).toBe(16);
  expect(date.hours).toBe(10);
  expect(date.minutes).toBe(0);
  expect(date.seconds).toBe(0);

  const hour = dt.createSet({ hours: 9 });
  expect(hour.year).toBe(2020);
  expect(hour.month).toBe(0);
  expect(hour.date).toBe(1);
  expect(hour.hours).toBe(9);
  expect(hour.minutes).toBe(0);
  expect(hour.seconds).toBe(0);

  const minute = dt.createSet({ minutes: 40 });
  expect(minute.year).toBe(2020);
  expect(minute.month).toBe(0);
  expect(minute.date).toBe(1);
  expect(minute.hours).toBe(10);
  expect(minute.minutes).toBe(40);
  expect(minute.seconds).toBe(0);

  const second = dt.createSet({ seconds: 25 });
  expect(second.year).toBe(2020);
  expect(second.month).toBe(0);
  expect(second.date).toBe(1);
  expect(second.hours).toBe(10);
  expect(second.minutes).toBe(0);
  expect(second.seconds).toBe(25);

  const combined = dt.createSet({ year: 23, month: 5, date: 2, hours: 7, minutes: 12, seconds: 9 });
  expect(combined.year).toBe(23);
  expect(combined.month).toBe(5);
  expect(combined.date).toBe(2);
  expect(combined.hours).toBe(7);
  expect(combined.minutes).toBe(12);
  expect(combined.seconds).toBe(9);
});

test('timestamp', () => {
  const ts = Timestamp.in({ minutes: 42 });
  expect(ts.isExpired()).toBeFalsy();
  expect(ts.expiresIn('YMDHM')).toBe(42);
});
