import test from 'ava';
import release from '.';

test('release()', (t) => {
    t.is(typeof release.major, 'function');
    t.is(typeof release.minor, 'function');
    t.is(typeof release.patch, 'function');
});
