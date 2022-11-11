import { DomainEvent, EventHandler } from '../../src';

test('new EventHandler', () => {
  const handler = new EventHandler<string>('testHandler');

  expect(handler.name).toEqual('testHandler');
  expect(handler.occurred).toBeFalsy();
});

test('new DomainEvent', () => {
  const event = new DomainEvent<string>('plainEvent', 'plainPayload');

  expect(event.id).toBeDefined();
  expect(event.timestamp).toBeDefined();
  expect(event.name).toEqual('plainEvent');
  expect(event.payload).toEqual('plainPayload');
});

test('handling (subscribe + dispatch + undispatch', () => {
  const handler = new EventHandler<string>('testHandler');

  handler.subscribe('testSubscription', (dispatchedEvent) => {
    expect(dispatchedEvent.name).toEqual('testHandler');
    expect(dispatchedEvent.payload).toEqual('testPayload');
  });

  handler.dispatch('testPayload');

  expect(handler.occurred).toBeTruthy();

  handler.unsubscribe('testSubscription');
  // now this event will not be handled, though the expected payload will not fail
  handler.dispatch('failing payload');
});
