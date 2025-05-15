const BASE_URL = 'https://emkc.org/api/v2/piston'

const getFileExtension = (language) => {
  switch (language) {
    case 'python3':
      return 'py'
    case 'cpp':
      return 'cpp'
    case 'c':
      return 'c'
    case 'java':
      return 'java'
    case 'javascript':
      return 'js'
    case 'typescript':
      return 'ts'
    default:
      return 'txt'
  }
}

const executeCode = async (language, code, inputs) => {
  try {
    const response = await fetch(`${BASE_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        version: '*',
        files: [
          {
            name: 'main.' + getFileExtension(language),
            content: code,
          },
        ],
        stdin: inputs.join('\n'),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Piston API error:', errorData)
      throw new Error(
        `Piston API error: ${response.status} - ${
          errorData?.message || 'Unknown error'
        }`
      )
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error executing code:', error)
    throw error
  }
}

export const runCode = async (language, code, stdin) => {
  try {
    const result = await executeCode(language, code, [stdin])
    return {
      stdout: result?.run?.stdout || '',
      stderr: result?.run?.stderr || '',
      compileOutput: result?.compile?.stderr || '',
      error: '', // No top-level error for successful execution
    }
  } catch (error) {
    console.error('Error running code:', error)
    return {
      stdout: '',
      stderr: '',
      compileOutput: '',
      error: error.message,
    }
  }
}

export const submitCodeWithTests = async (language, code, testcases) => {
  const results = []
  for (const testcase of testcases) {
    try {
      let inputForExecution = testcase.input
      // Check if the input is a JSON string.  If so, parse it.
      try {
        JSON.parse(testcase.input)
      } catch (e) {
        // If it's not JSON, assume it's a plain string and use it directly.
        //  No action needed, inputForExecution is already set.
      }

      // Format the input for the program's stdin.  This should work for most cases.
      const stdin = inputForExecution

      const result = await executeCode(language, code, [stdin])
      const actualOutput = result?.run?.stdout?.trim()
      const expectedOutput = testcase.output.trim()
      const passed = actualOutput === expectedOutput

      results.push({
        input: testcase.input,
        expectedOutput: testcase.output,
        actualOutput,
        passed,
        compileOutput: result?.compile?.stderr || '',
        stderr: result?.run?.stderr || '',
        message: result?.message || '',
        error: '',
      })
    } catch (error) {
      console.error('Error executing test case:', error)
      results.push({
        input: testcase.input,
        expectedOutput: testcase.output,
        actualOutput: 'Error',
        passed: false,
        compileOutput: '',
        stderr: '',
        message: '',
        error: error.message,
      })
    }
  }
  return results
}
