import * as fromGolfClub from './golf-club.actions';

describe('loadGolfClubs', () => {
  it('should return an action', () => {
    expect(fromGolfClub.loadGolfClubs().type).toBe('[GolfClub] Load GolfClubs');
  });
});
