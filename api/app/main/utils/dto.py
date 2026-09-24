from flask_restx import Namespace


class ApiDto:
    github_api = Namespace('github', description='github related operations')
    twitter_api = Namespace('twitter', description='twitter related operations')
