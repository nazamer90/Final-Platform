with open(r'C:\Users\dataf\Downloads\Eishro-Platform_V7\.env', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('localhost:3000', 'localhost:5174')

with open(r'C:\Users\dataf\Downloads\Eishro-Platform_V7\.env', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated .env successfully')
