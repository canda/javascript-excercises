import multiply from './43-multiply-strings';

it('should multiply 5x9', () => {
  expect(multiply('5', '9')).toEqual((5 * 9).toString());
});
it('should multiply long numbers', () => {
  expect(multiply('123456789', '987654321')).toEqual('121932631112635260');
});
