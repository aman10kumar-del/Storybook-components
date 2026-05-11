import { toMatchImageSnapshot } from 'jest-image-snapshot';

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;
const sleep = (ms) => new Promise(resolve => setTimeout(() => {resolve()}, ms))
const theme = process.env.PODS_THEME

const config = {
  async preVisit(page) {
    await page.emulateMedia({
      colorScheme: theme
    })
  },
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    await page.waitForLoadState("load");
    await sleep(3000);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: `${customSnapshotsDir}/${theme}`,
      customSnapshotIdentifier: context.id,
    });
  },
};

export default config;