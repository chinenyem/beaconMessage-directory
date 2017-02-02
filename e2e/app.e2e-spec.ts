import { BeaconMessageDirectoryPage } from './app.po';

describe('beacon-message-directory App', function() {
  let page: BeaconMessageDirectoryPage;

  beforeEach(() => {
    page = new BeaconMessageDirectoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
