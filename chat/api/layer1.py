import spacy
from textblob import TextBlob

nlp = spacy.load("en_core_web_sm")


def determine_output_type(query):
    query = query.lower()
    doc = nlp(query)
    blob = TextBlob(query)
    sentiment = blob.sentiment.polarity

    # print("Doc: ", doc)
    # print("Blob: ", blob)
    # print("Sentiment", sentiment)

    visual_indicators = [
        "graph",
        "chart",
        "image",
        "visualize",
        "visualization",
        "picture",
        "diagram",
        "plot",
        "map",
        "distribution",
    ]
    numerical_indicators = [
        "number",
        "count",
        "total",
        "average",
        "sum",
        "quantity",
        "percentage",
        "ratio",
    ]

    visual_count, numerical_count = 0, 0

    for token in doc:
        # print("part of speech: ", token.text, token.pos_, " entity: ", token.ent_type_)

        if token.text in visual_indicators:
            visual_count += 1
        elif token.text in numerical_indicators:
            numerical_count += 1

        if token.pos_ in ["NUM", "QUANT"]:
            numerical_count += 1
        elif token.ent_type_ in ["DATE", "TIME", "PERCENT", "QUANTITY"]:
            numerical_count += 1
        elif token.ent_type_ in ["ORG", "GPE", "LOC"]:
            visual_count += 1

    if sentiment > 0.2:
        visual_count += 1
    elif sentiment < -0.2:
        numerical_count += 1

    print("Visual score: ", visual_count)
    print("Numerical score: ", numerical_count)
    if visual_count > numerical_count:
        return "visual"
    else:
        return "numerical"
