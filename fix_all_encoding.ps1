$files = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $files) {
    Write-Host "Processing $file..."
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Replace common encoding artifacts with correct characters
    $newContent = $content.Replace('Ãœ', 'Ü') `
        .Replace('Ã¼', 'ü') `
        .Replace('Ã¶', 'ö') `
        .Replace('Ã¤', 'ä') `
        .Replace('ÃŸ', 'ß') `
        .Replace('Ã„', 'Ä') `
        .Replace('Ã–', 'Ö') `
        .Replace('â€“', '–') `
        .Replace('', '') # Remove replacement characters if any
    
    # Also replace HTML entities with actual characters for cleaner HTML if preferred, 
    # OR ensure consistent usage. The user asked for "richtig geschrieben", so actual characters are often better in UTF-8.
    # But let's stick to fixing the artifacts first.
    
    # Specific known errors from previous greps
    $newContent = $newContent.Replace('ober', 'Über') `
        .Replace('Sfty', 'Söfty') `
        .Replace('Selbststndigkeit', 'Selbstständigkeit') `
        .Replace('erfǬllt', 'erfüllt') `
        .Replace('fǬr', 'für') `
        .Replace('Rumlichkeiten', 'Räumlichkeiten') `
        .Replace('Qualitt', 'Qualität') `
        .Replace('Fhigkeiten', 'Fähigkeiten') `
        .Replace('regelmYig', 'regelmäßig') `
        .Replace('knnen', 'können') `
        .Replace('Gem', 'Gemäß') `
        .Replace('groe', 'große') `
        .Replace('Men', 'Menü') `
        .Replace('AuYerhalb', 'Außerhalb') `
        .Replace('Europische', 'Europäische') `
        .Replace('tglich', 'täglich') `
        .Replace('ber', 'Über')
                             
    if ($content -ne $newContent) {
        $newContent | Set-Content $file.FullName -Encoding UTF8
        Write-Host "Fixed encoding issues in $file."
    }
}
