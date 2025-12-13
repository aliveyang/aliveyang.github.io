@echo off
echo Building Hugo site with minification...
echo.
hugo --minify
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Build complete!
    echo Generated files are in: ./public/
    echo ========================================
) else (
    echo.
    echo Build failed with error code %ERRORLEVEL%
)
pause
