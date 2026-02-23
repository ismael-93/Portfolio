#!/usr/bin/env python3
# -*- coding: utf-8 -*-

filepath = r'c:\wamp64\www\PortfolioV2\index.html'

# Read the file
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines before: {len(lines)}")

# Find the line with the malformed </section>
start_cleanup = None
for i, line in enumerate(lines):
    if '</section> à des menaces' in line:
        start_cleanup = i
        break

if start_cleanup is None:
    print("Could not find the malformed section")
    exit(1)

print(f"Found malformed section at line {start_cleanup + 1}")

# Find where to stop - look for the proper closing section before footer
end_cleanup = None
for i in range(start_cleanup + 1, len(lines)):
    if '</section>' in lines[i] and i > start_cleanup + 10:  # Make sure we're past the garbage
        # Look ahead to see if footer follows
        for j in range(i+1, min(i+5, len(lines))):
            if '<footer' in lines[j]:
                end_cleanup = i
                break
        if end_cleanup:
            break

if end_cleanup is None:
    print("Could not find the proper closing section")
    exit(1)

print(f"Found proper closing section at line {end_cleanup + 1}")

# Remove the garbage section
# Keep lines 0 to start_cleanup-1, and lines end_cleanup+1 onwards
new_content = lines[:start_cleanup] + lines[end_cleanup+1:]

# Write back
with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_content)

print(f"Total lines after: {len(new_content)}")
print(f"Removed {len(lines) - len(new_content)} lines")
print("File cleaned successfully!")
