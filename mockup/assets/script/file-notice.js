// Classic script (not a module) so it still runs on file://, where the module entry is blocked.
if (location.protocol === 'file:') document.getElementById('fileNotice').hidden = false
