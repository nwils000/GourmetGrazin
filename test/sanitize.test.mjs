// Guards the layer that re-checks the model's output before it reaches the
// form. Whatever the model returns, only real menu ids, real calendar dates,
// and plausible headcounts get through.
//
// Run with: npm test
import { sanitize } from '../api/inquiry-assist.js'
const TODAY = '2026-08-27'
let pass = 0, fail = 0
const check = (label, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  ok ? pass++ : fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`)
  if (!ok) console.log(`        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`)
}
const S = (o) => sanitize(o, TODAY)

console.log('--- hallucinated / invalid values are dropped ---')
check('invented service id',      S({services:['grazing-table','meatball-platter','']}).services, ['grazing-table'])
check('invented addon id',        S({addons:['floral','unicorn']}).addons, ['floral'])
check('invented dietary value',   S({dietary:['Gluten-free','Keto']}).dietary, ['Gluten-free'])
check('invented city',            S({city:'Narnia'}).fields.city, '')
check('invented event type',      S({eventType:'Funeral'}).fields.eventType, '')
check('duplicate ids collapsed',  S({services:['grazing-table','grazing-table']}).services, ['grazing-table'])

console.log('\n--- dates ---')
check('past date rejected',       S({date:'2026-05-16'}).fields.date, '')
check('today accepted',           S({date:'2026-08-27'}).fields.date, '2026-08-27')
check('future accepted',          S({date:'2027-05-16'}).fields.date, '2027-05-16')
check('Feb 30 rejected',          S({date:'2027-02-30'}).fields.date, '')
check('month 13 rejected',        S({date:'2027-13-01'}).fields.date, '')
check('absurd year rejected',     S({date:'2099-01-01'}).fields.date, '')
check('bad format rejected',      S({date:'May 16th'}).fields.date, '')
check('leap day accepted',        S({date:'2028-02-29'}).fields.date, '2028-02-29')

console.log('\n--- guests ---')
check('normal count',             S({guests:'40'}).fields.guests, '40')
check('zero rejected',            S({guests:'0'}).fields.guests, '')
check('absurd count rejected',    S({guests:'99999'}).fields.guests, '')
check('non-numeric rejected',     S({guests:'about forty'}).fields.guests, '')
check('negative rejected',        S({guests:'-5'}).fields.guests, '')
check('leading zeros normalised', S({guests:'0040'}).fields.guests, '40')

console.log('\n--- length caps & types ---')
check('notes capped at 600',      S({notes:'x'.repeat(5000)}).fields.notes.length, 600)
check('summary capped at 240',    S({summary:'y'.repeat(5000)}).summary.length, 240)
check('missing fields safe',      S({}), {fields:{eventType:'',date:'',guests:'',city:'',notes:''},services:[],addons:[],dietary:[],unusualRequest:false,summary:''})
check('nulls safe',               S({services:null,addons:null,dietary:null,notes:null,summary:null}).services, [])
check('unusualRequest coerced',   S({unusualRequest:'yes'}).unusualRequest, true)

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
