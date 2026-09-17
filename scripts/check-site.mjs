import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const index = await readFile(resolve(root, "index.html"), "utf8");
const thanks = await readFile(resolve(root, "thanks.html"), "utf8");

const checks = [];
const check = (label, passed) => checks.push([label, Boolean(passed)]);

check("Georgian document language is declared", /<html\s+lang=["']ka["']/i.test(index));
check("page title and meta description exist", /<title>[^<]+<\/title>/i.test(index) && /<meta\s+name=["']description["'][^>]+content=["'][^"']+/i.test(index));
check("canonical production URL is set", /<link\s+rel=["']canonical["']\s+href=["']https:\/\/deconart\.ge\/["']/i.test(index));
check("Open Graph and Twitter cards use og.png", /property=["']og:image["'][^>]+https:\/\/deconart\.ge\/og\.png/i.test(index) && /name=["']twitter:image["'][^>]+https:\/\/deconart\.ge\/og\.png/i.test(index));
check("structured business data exists", /application\/ld\+json/i.test(index) && /HomeAndConstructionBusiness/.test(index));
check("current wall prices are present", /90₾\/მ²-დან/.test(index) && /110₾\/მ²-დან/.test(index));
check("calculator uses current rates", /option\s+value=["']90["'][^>]+data-project=["']interior["']/i.test(index) && /option\s+value=["']110["'][^>]+data-project=["']exterior["']/i.test(index));
check("calculator has no unapproved complexity surcharge", !/calcComplexity|value=["']1\.[24]["']/.test(index));
check("calculator values transfer only on explicit handoff", /useEstimate[^]*leadRate\.value[^]*leadTotal\.value/.test(index) && /\[leadProject, leadArea\][^]*leadRate\.value = ''[^]*leadTotal\.value = ''/.test(index));
check("public phone is visible and callable", /\+995 577 789 990/.test(index) && /href=["']tel:\+995577789990["']/i.test(index));
check("Facebook and Messenger page ID is linked", /61588337703082/.test(index));
check("table collection is described as upcoming", /table_interest/.test(index) && /ჯერ დამუშავებაშია/.test(index));
check("lead form keeps its Netlify identity", /<form[^>]+name=["']project-request["'][^>]+method=["']POST["'][^>]+action=["']\/thanks\.html["'][^>]+data-netlify=["']true["']/i.test(index));
check("lead form includes honeypot", /netlify-honeypot=["']bot-field["']/i.test(index) && /name=["']bot-field["']/i.test(index));
check("lead form requires name, phone, and project type", /id=["']leadName["'][^>]+required/i.test(index) && /id=["']leadPhone["'][^>]+required/i.test(index) && /id=["']leadProject["'][^>]+required/i.test(index));
check("privacy note is shown near form", /ფორმის გაგზავნით გვაძლევთ უფლებას/.test(index));
check("photo instructions point to Messenger", /2–4 ფოტო გამოგვიგზავნეთ Messenger-ში/.test(index) && !/Messenger-ში ან ფორმით/.test(index));
check("thank-you page is noindex and actionable", /name=["']robots["']\s+content=["']noindex["']/i.test(thanks) && /61588337703082/.test(thanks) && /tel:\+995577789990/.test(thanks));
check("legacy unsupported proof claims are absent", !/(200\+|5\+\s*(years|წელი)|2[- ]?(year|წლიანი)|certified installers|100% premium|პრემიუმ)/i.test(index));
check("legacy Netlify image transforms are absent", !/\.netlify\/images/.test(index));
check("reveal animation fails open without JavaScript", /\.reveal \{ opacity: 1; transform: none; \}/.test(index) && /\.js \.reveal/.test(index));

const ids = [...index.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
check("HTML ids are unique", new Set(ids).size === ids.length);

const localReferences = [
  ...index.matchAll(/\s(?:src|href)=["']((?:assets\/|Smartdoor-font\.woff2|og\.png)[^"']*)["']/gi),
  ...thanks.matchAll(/\s(?:src|href)=["']((?:assets\/|Smartdoor-font\.woff2|og\.png)[^"']*)["']/gi),
].map((match) => match[1].split(/[?#]/)[0]);

for (const asset of new Set(localReferences)) {
  try {
    await access(resolve(root, asset));
    check(`local asset exists: ${asset}`, true);
  } catch {
    check(`local asset exists: ${asset}`, false);
  }
}

for (const file of ["robots.txt", "sitemap.xml", "og.png", "netlify.toml", "scripts/build-site.mjs"]) {
  try {
    await access(resolve(root, file));
    check(`launch file exists: ${file}`, true);
  } catch {
    check(`launch file exists: ${file}`, false);
  }
}

const failed = checks.filter(([, passed]) => !passed);
for (const [label, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} ${label}`);
}

console.log(`\n${checks.length - failed.length}/${checks.length} checks passed.`);
if (failed.length > 0) process.exitCode = 1;
