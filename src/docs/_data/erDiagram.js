export default `erDiagram
    COMPETENCY ||--o{ FEATURE : dependency
    RULESET }o--o{ FEATURE : available
    COMPETENCY ||--o{ COMPETENCY: duplicate_of
    EVIDENCE ||--|| COMPETENCY: defines
    RULESET }o--|| SCOPE : scope
    FEATURE }o--|| SCOPE : provided_by
    FEATURE ||--o{ FEATURE: enables

    COMPETENCY {
        string ID FK "ID in evidence CSV file"
        string competency "Name of the competency"
        string notes "Optional notes"
    }

    RULESET {
        string ID "Refernence of the ruleset"
        string name "Name of the ruleset"
        string description "Brief description"
        int order "Allows sorting"
        boolean draft "Whether to make ruleset available"
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

    EVIDENCE {
        string ID PK "Identifier of current evidence row - used as key for competency"
        string Duplicates "List of other competency IDs which this row dupliates"
        string Competency "Name of the competency"
        string RMFI_Category "Category in the Register of Members' Financial Interests"
    }
`;