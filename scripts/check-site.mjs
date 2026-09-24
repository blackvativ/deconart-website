import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const index = await readFile(resolve(root, "index.html"), "utf8");
const thanks = await readFile(resolve(root, "thanks.html"), "utf8");

const checks = [];
const check = (label, passed) => checks.push([label, Boolean(passed)]);
const calculatorOptions = [...index.matchAll(/<option\s+value=["'](\d+)["']\s+data-project=["']([^"']+)["']/gi)]
  .map((match) => `${match[2]}:${match[1]}`);

check("Georgian document language is declared", /<html\s+lang=["']ka["']/i.test(index));
check("page title and meta description exist", /<title>[^<]+<\/title>/i.test(index) && /<meta\s+name=["']description["'][^>]+content=["'][^"']+/i.test(index));
check("canonical production URL is set", /<link\s+rel=["']canonical["']\s+href=["']https:\/\/deconart\.ge\/["']/i.test(index));
check("Open Graph and Twitter cards use og.png", /property=["']og:image["'][^>]+https:\/\/deconart\.ge\/og\.png/i.test(index) && /name=["']twitter:image["'][^>]+https:\/\/deconart\.ge\/og\.png/i.test(index));
check("structured business data exists", /application\/ld\+json/i.test(index) && /HomeAndConstructionBusiness/.test(index));
check("authoritative public rates and minimum are present", /კედელი — 90₾\/მ²-დან/.test(index) && /იატაკი, აბაზანა, საშხაპე[^<]+140₾\/მ²-დან/.test(index) && /რკინის კარი — 1,200₾\/ც-დან/.test(index) && /პლინტუსი — 30₾\/გრძ\.მ-დან/.test(index) && /30 მ² ან 2,500₾/.test(index));
check("unsupported exterior pricing is absent", !/110₾|ექსტერიერის კედელი|data-project=["']exterior["']/i.test(index));
check("calculator uses the exact approved project/rate set", JSON.stringify(calculatorOptions) === JSON.stringify(["wall:90", "floor:140", "wet_area:140", "ceiling:140"]));
check("calculator applies the 2500 GEL project minimum", /Math\.max\(rate \* area, 2500\)/.test(index) && /2,500₾-ის პროექტის მინიმუმი/.test(index));
check("calculator uses decimal area without an arbitrary maximum", /id=["']calcArea["'][^>]+type=["']number["'][^>]+min=["']0\.1["'][^>]+step=["']0\.1["']/.test(index) && !/id=["']calcArea["'][^>]+max=/.test(index));
check("calculator has no unapproved complexity surcharge", !/calcComplexity|value=["']1\.[24]["']/.test(index));
check("calculator values transfer only on explicit handoff", /useEstimate[^]*leadRate\.value[^]*leadTotal\.value/.test(index) && /\[leadProject, leadArea\][^]*leadRate\.value = ''[^]*leadTotal\.value = ''/.test(index));
check("public phone is visible and callable", /\+995 577 789 990/.test(index) && /href=["']tel:\+995577789990["']/i.test(index));
check("Facebook and Messenger page ID is linked", /61588337703082/.test(index));
check("table collection stays a separate prelaunch interest path", /table_interest/.test(index) && /ცალკე, ინდივიდუალური პროექტის\/დაინტერესების გზით/.test(index));
check("finish collection keeps the approved three and adds the three replacements", ["Silver Mist", "Linen", "Sand Veil", "Warm Stone", "Chalk Linen", "Forest Sage"].every((finish) => index.includes(finish)) && !/Sage Mist|Pearl|Glacier/.test(index));
check("lead form keeps its Netlify identity", /<form[^>]+name=["']project-request["'][^>]+method=["']POST["'][^>]+action=["']\/thanks\.html["'][^>]+data-netlify=["']true["']/i.test(index));
check("lead form includes honeypot", /netlify-honeypot=["']bot-field["']/i.test(index) && /name=["']bot-field["']/i.test(index));
check("lead form captures and requires the authoritative intake fields", /id=["']leadName["'][^>]+required/i.test(index) && /id=["']leadPhone["'][^>]+required/i.test(index) && /id=["']leadSpace["'][^>]+required/i.test(index) && /id=["']leadProject["'][^>]+required/i.test(index) && /id=["']leadArea["'][^>]+name=["']project_quantity["'][^>]+required/i.test(index) && /id=["']leadLocation["'][^>]+required/i.test(index) && /id=["']leadSubstrate["'][^>]+required/i.test(index) && /id=["']leadStart["'][^>]+required/i.test(index) && /id=["']leadFinish["'][^>]+required/i.test(index) && /id=["']leadIssues["'][^>]+required/i.test(index) && /name=["']message["']/.test(index));
check("privacy and statutory-rights notices are present", /მონაცემთა კონტროლიორია DECON ART/.test(index) && /Netlify/.test(index) && /არ ზღუდავს მომხმარებლის კანონით მინიჭებულ უფლებებს/.test(index));
check("photo instructions join Messenger photos to the form lead", /იგივე სახელი და ტელეფონი/.test(index) && /იგივე სახელი და ტელეფონი/.test(thanks));
check("thank-you page is noindex and actionable", /name=["']robots["']\s+content=["']noindex["']/i.test(thanks) && /61588337703082/.test(thanks) && /tel:\+995577789990/.test(thanks));
check("legacy unsupported proof claims are absent", !/(200\+|5\+\s*(years|წელი)|2[- ]?(year|წლიანი)|certified installers|100% premium|პრემიუმ)/i.test(index));
check("false no-floor FAQ is absent", !/იატაკი ამ ეტაპზე სტანდარტულ შეთავაზებაში არ შედის/.test(index));
check("legacy Netlify image transforms are absent", !/\.netlify\/images/.test(index));
check("reveal animation fails open without JavaScript", /\.reveal \{ opacity: 1; transform: none; \}/.test(index) && /\.js \.reveal/.test(index));
check("footer logo preserves its aspect ratio", /\.footer-brand img \{[^}]*width:\s*150px;[^}]*height:\s*auto;[^}]*\}/.test(index));

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
