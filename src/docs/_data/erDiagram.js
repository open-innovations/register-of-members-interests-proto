export default `erDiagram
    COMPETENCY ||--o{ FEATURE : dependency
    STATE }o--o{ FEATURE : available
    COMPETENCY ||--o{ COMPETENCY: duplicate_of
    STATE }o--|| SCOPE : scope
    FEATURE }o--|| SCOPE : provided_by
    FEATURE ||--o{ FEATURE: enables

    COMPETENCY {
        string ID PK "ID in evidence CSV file (filename of definition file)"
        string competency "Name of the competency"
        string notes "Optional notes"
    }

    STATE {
        string ID "Refernence of the state"
        string name "Name of the state"
        string description "Brief description"
        int order "Allows sorting"
        boolean draft "Whether to make state available"
    }

    FEATURE {
        string name PK "Fully qualified name"
        string description
        string notes
        string type "Type of field - e.g. text, date, checkbox"
        string format "Format of field - e.g. DD/MM/YYYY for dates"
        string units "Units for the feature"
    }
    SCOPE {
        string ID PK "Identifer of the scope"
    }
`;