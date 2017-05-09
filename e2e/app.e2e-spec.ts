import { CwmPage } from './app.po';

describe('cwm App', () => {
  let page: CwmPage;

  beforeEach(() => {
    page = new CwmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
