import Sanscript from "@indic-transliteration/sanscript";

// Ordinary English spellings are ambiguous; common names need Hindi spellings
// rather than a literal Sanskrit romanization. The suggestion remains editable.
const commonNames: Record<string, string> = {
    amit: "अमित", gupta: "गुप्ता", ravi: "रवि", tiwari: "तिवारी",
    pankaj: "पंकज", sharma: "शर्मा", deepak: "दीपक", ankit: "अंकित",
    mishra: "मिश्रा", manoj: "मनोज", ayush: "आयुष", aayush: "आयुष",
    saumya: "सौम्या", agrahari: "अग्रहरि", rahul: "राहुल", rohit: "रोहित",
    raj: "राज", rajiv: "राजीव", rajeev: "राजीव", rajesh: "राजेश",
    kumar: "कुमार", singh: "सिंह", verma: "वर्मा", priya: "प्रिया",
    pooja: "पूजा", puja: "पूजा", neha: "नेहा", anjali: "अंजलि",
    sanjay: "संजय", sanju: "संजू", vijay: "विजय", ajay: "अजय",
    ashish: "आशीष", ashutosh: "आशुतोष", abhishek: "अभिषेक",
    akash: "आकाश", aakash: "आकाश", krishna: "कृष्ण", ramesh: "रमेश",
    suresh: "सुरेश", dinesh: "दिनेश", mukesh: "मुकेश", yadav: "यादव",
};

type KnownName = { name_en: string; name_hi: string };

export function suggestHindiName(name: string, knownNames: KnownName[] = []): string {
    const normalized = name.trim().replace(/\s+/g, " ").toLowerCase();
    if (!normalized) return "";
    const existing = knownNames.find(member =>
        member.name_en.trim().replace(/\s+/g, " ").toLowerCase() === normalized);
    if (existing?.name_hi.trim()) return existing.name_hi;

    return name.replace(/[a-z]+/gi, word => {
        const lower = word.toLowerCase();
        if (Object.hasOwn(commonNames, lower)) return commonNames[lower];
        // Normalize everyday roman typing and omit Hindi's word-final halant.
        const roman = lower.replace(/chh/g, "Ch").replace(/w/g, "v")
            .replace(/([a-z])i$/, "$1ii");
        return Sanscript.t(roman, "itrans", "devanagari").replace(/्$/, "");
    });
}
