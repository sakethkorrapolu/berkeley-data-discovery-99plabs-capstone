from pandasai import SmartDataframe
from pandasai.llm import OpenAI
import pandas as pd
import config
import matplotlib

matplotlib.use("agg")


def get_pandasai_model():
    trips_summary = config.trips_summary_path

    trips_summary_df = pd.read_csv(trips_summary)
    trips_summary_df = trips_summary_df[
        [
            "device",
            "startlatitude",
            "startlongitude",
            "endlatitude",
            "endlongitude",
            "startodometer",
            "endodometer",
            "numbsmtx",
            "numnormalbsmrx",
            "numshadowbsmrx",
            "numspatrx",
            "numwarnings",
            "numinforms",
            "numgnssoutages",
            "numcanoutages",
            "numintersectionencounters",
            "fullmediaversionstring",
            "totalstorageondevice",
            "storageused",
            "startlocaltime_hr",
            "endlocaltime_hr",
        ]
    ]
    # print(trips_summary_df.head())

    llm = OpenAI(api_token=config.api_key)
    trips_summary_sdf = SmartDataframe(
        trips_summary_df, config={"llm": llm, "enable_cache": False}
    )
    # print(trips_summary_sdf.head(5))
    return trips_summary_sdf


# get_pandasai_model()
