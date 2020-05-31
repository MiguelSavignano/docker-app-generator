import * as Dockerfile from './Dockerfile';
import * as Compose from './docker-compose';

describe('Dockerfile', () => {
  test('#template', () => {
    expect(Dockerfile.template({ node_version: '10' })).toMatch(/FROM/);
  });
});

describe('Compose', () => {
  test('#template', () => {
    expect(Compose.template({ node_version: '10' })).toMatch(/services\:/);
  });
});
