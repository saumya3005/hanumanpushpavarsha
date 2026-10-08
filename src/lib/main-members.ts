export interface MainMember {
    id: string;
    name_en: string;
    name_hi: string;
    role_key: string;
    role_en: string;
    role_hi: string;
    description_en: string;
    description_hi: string;
    photo_url: string;
    photo_path: string | null;
    phone: string;
    display_order: number;
}

export const mainMemberRoles = [
    ['members.role.president', 'President', 'अध्यक्ष'],
    ['members.role.priest', 'Vice President', 'उपाध्यक्ष'],
    ['members.role.treasurer', 'Treasurer', 'कोषाध्यक्ष'],
    ['members.role.coordinator', 'General Secretary', 'महामंत्री'],
    ['members.role.minister', 'Minister', 'मंत्री'],
];
