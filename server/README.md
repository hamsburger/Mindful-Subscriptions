# Backend User Guide (FastAPI)

## How to Run
- Create a `.env` file in root and paste in your [Cohere API key]() as `COHERE_API_KEY=...`
- Create a `venv` and `pip` install all dependencies in `requirements.txt`
- Run the BE using `python -m uvicorn main:app --reload`
  - `--reload` flag ensure FastAPI refreshes every time you make changes

## Linting with flake8-black
- Install `pip3 install flake8-black`
- Update the code formatting per Black
    - `black --exclude=env .`
- Check any left issues and correct it
    - `flake8 --exclude env --ignore E402,E501 .`