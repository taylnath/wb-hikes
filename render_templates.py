from jinja2 import Environment, FileSystemLoader
import jinja2
# PackageLoader, select_autoescape

prefix = '/home/melissa/Documents/wb-hikes/'

# where to look for templates
file_loader = FileSystemLoader(prefix + 'templates')

env = Environment(
    loader=file_loader,
    trim_blocks=True,
    lstrip_blocks=True,
    undefined=jinja2.StrictUndefined,
    line_statement_prefix='#',
    line_comment_prefix='##'
    )

# get template names (i.e. home, etc)
template_names = filter(
    lambda x: x in ['about', 'hikes', 'home', 'map', 'contact'],
    [y.split('.')[0] for y in env.list_templates()]
    )

# get template objects
templates = map(lambda x: env.get_template(f'{x}.html.jinja'), template_names)

for template in templates:
    print("Rendering", template.name)
    template.stream().dump(f'{prefix}src/{".".join(template.name.split(".")[:-1])}')

