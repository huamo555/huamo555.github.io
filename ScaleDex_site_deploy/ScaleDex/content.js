/* Edit project metadata and verified release links here. Empty resources are intentionally not presented as live releases. */
window.SCALEDEX_SITE = {
  "name": "ScaleDex",
  "title": "Towards Scale-Robust Universal Dexterous Grasping",
  "status": "Manuscript draft",
  "authors": [],
  "affiliations": [],
  "resources": {
    "paper": "",
    "supplement": "",
    "github": "https://github.com/huamo555",
    "code": "",
    "dataset": "",
    "arxiv": ""
  },
  "video": "",
  "citation": "",
  "resultsStatus": "Manuscript-reported results; subject to final-log verification."
};

/* Values transcribed from main.tex, tab:scale-results. Error bars show sample SD across three training seeds. */
window.SCALEDEX_DATA = {
  "scales": [
    0.6,
    0.8,
    1.0,
    1.2,
    1.5
  ],
  "columns": [
    "0.6",
    "0.8",
    "1.0",
    "1.2",
    "1.5",
    "Average"
  ],
  "benchmark": {
    "teacher": [
      {
        "method": "UniDexGrasp",
        "mean": [
          62.2,
          63.2,
          48.9,
          35.5,
          14.9,
          44.9
        ],
        "sd": [
          1.1,
          0.4,
          0.5,
          0.3,
          0.7,
          0.4
        ]
      },
      {
        "method": "UniDexGrasp++",
        "mean": [
          74.1,
          74.2,
          61.4,
          42.9,
          21.6,
          54.8
        ],
        "sd": [
          0.6,
          0.5,
          0.8,
          0.4,
          0.2,
          0.3
        ]
      },
      {
        "method": "ResDex",
        "mean": [
          90.5,
          91.8,
          89.3,
          84.8,
          70.4,
          85.4
        ],
        "sd": [
          0.2,
          0.3,
          0.3,
          0.3,
          0.3,
          0.2
        ]
      },
      {
        "method": "ResDex + scale",
        "mean": [
          89.1,
          93.8,
          90.0,
          81.8,
          71.8,
          85.3
        ],
        "sd": [
          0.3,
          0.3,
          0.4,
          0.3,
          0.2,
          0.1
        ]
      },
      {
        "method": "ScaleDex",
        "mean": [
          96.9,
          97.6,
          97.6,
          93.5,
          79.1,
          92.9
        ],
        "sd": [
          0.2,
          0.2,
          0.4,
          0.3,
          0.4,
          0.1
        ]
      }
    ],
    "student": [
      {
        "method": "UniDexGrasp",
        "mean": [
          51.9,
          44.3,
          30.8,
          20.7,
          14.8,
          32.5
        ],
        "sd": [
          0.3,
          0.4,
          0.7,
          0.6,
          0.4,
          0.3
        ]
      },
      {
        "method": "UniDexGrasp++",
        "mean": [
          63.2,
          50.4,
          41.5,
          37.7,
          23.2,
          43.2
        ],
        "sd": [
          0.8,
          0.6,
          0.7,
          0.5,
          0.4,
          0.5
        ]
      },
      {
        "method": "ResDex",
        "mean": [
          80.7,
          81.2,
          77.9,
          65.1,
          47.7,
          70.5
        ],
        "sd": [
          0.3,
          0.5,
          0.4,
          0.5,
          0.3,
          0.4
        ]
      },
      {
        "method": "ResDex + scale",
        "mean": [
          80.2,
          82.5,
          78.1,
          63.4,
          48.0,
          70.4
        ],
        "sd": [
          0.2,
          0.3,
          0.2,
          0.4,
          0.3,
          0.1
        ]
      },
      {
        "method": "ScaleDex",
        "mean": [
          82.1,
          89.0,
          87.4,
          84.1,
          72.7,
          83.1
        ],
        "sd": [
          0.3,
          0.7,
          0.3,
          0.4,
          0.3,
          0.3
        ]
      }
    ]
  },
  "reported_gains": {
    "teacher": [
      6.4,
      5.8,
      8.3,
      8.7,
      8.7,
      7.6
    ],
    "student": [
      1.4,
      7.8,
      9.5,
      19.0,
      25.0,
      12.5
    ]
  },
  "single_view": {
    "ResDex": [
      64.7,
      68.0,
      66.3,
      53.1,
      36.3,
      57.7
    ],
    "ScaleDex": [
      74.3,
      81.7,
      82.4,
      69.3,
      56.6,
      72.9
    ],
    "source": "main.tex tab:single-view-results; fixed simulated camera, oracle segmentation, no fine tuning, not real-world validation"
  },
  "hold_120steps": {
    "ResDex": [
      53.7,
      52.5,
      50.4,
      38.6,
      19.8,
      43.0
    ],
    "ScaleDex": [
      65.2,
      71.1,
      69.2,
      63.8,
      38.8,
      61.6
    ],
    "source": "supplementary.tex tab:supp-lift-hold; 120 steps=2s at60Hz; all episodes denominator, non-reaching fail"
  }
};
