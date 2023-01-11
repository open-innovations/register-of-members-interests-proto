export default `erDiagram
    COMPETENCY ||--o{ FEATURE : dependency
    STATE }o--o{ FEATURE : available
    COMPETENCY ||--o{ COMPETENCY: duplicate_of
    STATE }o--|| SCOPE : scope
    SCOPE ||--o{ FEATURE : owns
    COMPETENCY {
        string notes
        string pseudocode
    }
    STATE {
        string name
        string description
        date date
        url source
        boolean draft
    }
`;