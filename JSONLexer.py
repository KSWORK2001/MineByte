# JSONLexer.py
import ply.lex as lex

# List of token names
tokens = [
    'NUMBER', 'STRING', 'LBRACE', 'RBRACE', 'LBRACKET', 'RBRACKET', 
    'COLON', 'COMMA', 'SEMI'
]

# Regular expressions for tokens
t_LBRACE = r'\{'
t_RBRACE = r'\}'
t_LBRACKET = r'\['
t_RBRACKET = r'\]'
t_COLON = r':'
t_COMMA = r','
t_SEMI = r';'

# STRING token for JSON keys and values
def t_STRING(t):
    r'"([^"\\]|\\.)*"'
    t.value = t.value[1:-1]  # Strip surrounding double quotes
    return t

# NUMBER token for integers (we can expand this for floats if needed)
def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

# Ignore whitespace
t_ignore = ' \t\n'

# Error handling rule
def t_error(t):
    print("Syntax error in input!")
    t.lexer.skip(1)

# Build the lexer
lexer = lex.lex()
