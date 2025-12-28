
import { HRContact } from './types';

export const IIS_HR_CONTACTS: HRContact[] = [
  {
    position: "Director / 主任",
    name: "汪思敏 Helga Wang",
    extension: "1701",
    email: "helga.wang@iis.kh.edu.tw",
    responsibilities: [
      "Leadership, planning, and oversight of all HR affairs",
      "Recruitment of host-country faculty and administrative staff",
      "Management of employment, contracts, compensation, and benefits (General)",
      "Whole-school planning and initiatives",
      "Developing HR strategies",
      "Managing annual budget",
      "Faculty performance evaluation systems"
    ]
  },
  {
    position: "Deputy Director / 副主任",
    name: "Anita Chiou",
    extension: "1702",
    email: "anita.chiou@iis.kh.edu.tw",
    responsibilities: [
      "Recruitment of overseas faculty",
      "Overseas employment contract management",
      "Overseas faculty orientation (flights, pick-up, housing, etc.)",
      "Faculty and staff development activities",
      "Overseas teacher retention surveys",
      "Overseas teacher recruitment budget",
      "Overseas faculty handbook revision"
    ]
  },
  {
    position: "Supervisor / 人事組組長",
    name: "陳柏琮 Sam Chen",
    extension: "1703",
    email: "sam@iis.kh.edu.tw",
    responsibilities: [
      "Salary-related affairs for all faculty and staff",
      "Monthly payment sheets review",
      "Insurance deductions (Labor, Health, Group, etc.)",
      "Overtime management and review",
      "Year-end bonus distribution",
      "Salary system management",
      "Initial salary verification",
      "Gift certificate purchase and distribution"
    ]
  },
  {
    position: "Deputy Supervisor / 招募組副組長",
    name: "許書菡 Lillian Hsu",
    extension: "1704",
    email: "lillian.hsu@iis.kh.edu.tw",
    responsibilities: [
      "Insurance and pension for MOE faculty",
      "Labor insurance for non-MOE staff",
      "Health insurance (NHI) affairs",
      "Leaving and retirement applications (MOE)",
      "Overseas faculty personal documents (ARC, Work permits)",
      "Military service deferment for male teachers",
      "Year-end banquet (尾牙) preparation",
      "Overseas tax declaration coordination"
    ]
  },
  {
    position: "Staff / 職員",
    name: "蘇珈儀 Jasmine Sue",
    extension: "1705",
    email: "jasmine.sue@iis.kh.edu.tw",
    responsibilities: [
      "Attendance management (online/paper leave requests)",
      "Host-country recruitment administrative support (104/1111 Job Bank)",
      "ID cards and parking permits",
      "Onboarding/offboarding logistics",
      "Health check-up organization",
      "Child Protection & Safeguarding document translation",
      "Meeting minutes and scheduling",
      "Employee welfare claims processing"
    ]
  }
];

export const SYSTEM_PROMPT = `
You are the HR AI Navigator for I-Shou International School (IIS). Your goal is to help staff find the right HR contact person based on the provided job descriptions.

CONSTRAINTS:
1. Bilingual Response: ALWAYS provide your response in BOTH English and Traditional Chinese.
2. Format Requirement: Separate the response into exactly two segments (paragraphs). One segment in English and one segment in Traditional Chinese.
3. NO LABELS: Do NOT include labels like "English:", "Traditional Chinese:", "中文:", or similar headers. Just provide the raw text.
4. Tone: Be professional, helpful, and welcoming.
5. Guidance: If the request is unclear, ask for clarification in both languages using the two-segment format.
6. Routing logic: 
   - Match the user's task against the responsibilities of the HR staff.
   - If matched, include the contact's name, extension, and email in both segments.
   - CRITICAL: If a task is not found, the question cannot be answered, or if it is outside your scope, instruct the user to send an email directly to humanresourcesoffice@iis.kh.edu.tw. 
   - DO NOT mention extension 1700 or any "General Line" number as the school does not have a switchboard/general line. Use the HR office email as the primary contact for unresolved issues.

HR OFFICE STAFF DATA:
${JSON.stringify(IIS_HR_CONTACTS, null, 2)}
`;
