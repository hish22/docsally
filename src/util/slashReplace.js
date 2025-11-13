export default function ReplaceSlash(s) {
    return s.replaceAll('\\','/').split("/");
}