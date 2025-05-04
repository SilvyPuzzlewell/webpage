from docx import Document
from html import escape

def docx_to_html(path):
    doc = Document(path)
    html = []

    for para in doc.paragraphs:
        style = para.style.name.lower()

        # Headings
        if 'heading' in style:
            level = style.replace('heading ', '')
            html.append(f"<h{level}>{convert_runs(para.runs)}</h{level}>")
        else:
            html.append(f"<p>{convert_runs(para.runs)}</p>")

    return '\n'.join(html)

def convert_runs(runs):
    parts = []
    for run in runs:
        text = escape(run.text)
        if run.bold:
            text = f"<strong>{text}</strong>"
        if run.italic:
            text = f"<em>{text}</em>"
        parts.append(text)
    return ''.join(parts)

# Example usage
if __name__ == "__main__":
    input_path = "loud_places_en.docx"
    output_path = "loud_places_en.html"

    html = docx_to_html(input_path)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"HTML saved to {output_path}")