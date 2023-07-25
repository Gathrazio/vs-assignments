/**
 * @description - determine whether the list of tuples creates a valid dependency tree (no circular deps)
 * @difficulty - 5/5
 * 
 * @param {Array<[string, string]>} - array of tuples representing a dependency between two things represented as strings (i.e.  ['A', 'B'] where B depends on A)
 * @returns {Boolean}
 * 
 * @example - validateDependencies([['A','B'], ['B','C']]) // --> true
 * @example - validateDependencies([['A','B'], ['B','A']]) // --> false (B depends on A, which already depends on B, this is circular)
 */


const validateDependencies = (deps) => {

    const graph = {};
    for (let i = 0; i < deps.length; i++) { // the creation of the graph
        const key = deps[i][0];
        if (graph[key]) {
            graph[key].push(deps[i][1])
        } else {
            graph[key] = [deps[i][1]]
        }
    }

    const recursiveDependencyCheck = (primaryDependency, dependentComponent) => { // the main body of this function checks if dependentComponent is a dependency of primaryDependency; when called recursively, the nested functions eventually determine whether primaryDependency depends on dependentComponent or anything that considers dependentComponent a dependency -- it will return false if so and true if not so.
        if (dependentComponent in graph) { // check if the graph has a property that matches the component that depends on primaryDependency. If it does, call this specific component the PotentialContradiction
            for (j = 0; j < graph[dependentComponent].length; j++) { // loop through the property that matches the PotentialContradiction
                if (graph[dependentComponent][j] === primaryDependency) { // check whether or not each component that considers the PotentialContradiction a direct dependency is the primaryDependency. If the PotentialContradiction is a direct dependecy of primaryDependency, it is then true that (1) the PotentialContradiction depends (in a potentially nth removed sense) on the primaryDependency, and from just now that (2) the primaryDependency depends directly on the PotentialContradiction. So the dependency validation should fail; the dependencies tree has a looped branch.
                    return false;
                }
                if (!recursiveDependencyCheck(primaryDependency, graph[dependentComponent][j])) { // if recursiveDependencyCheck returns false at any point, we will return out of every nested instance of recursiveDependencyCheck and eventually return false for the validateDependencies function
                    return false;
                }
            }
        }
        return true;
    }

    // now to actually validate the dependency tree

    for (const key in graph) { // for each key in the graph; for each component that is depended upon by at least one other component. In this syntax, key is the stringified property name -- like 'A'. Call these keys the primaryDependencies
        for (let k = 0; k < graph[key].length; k++) { // for each component that considers primaryDependency one of its direct dependencies
            if (!recursiveDependencyCheck(key, graph[key][k])) { // check recursively if primaryDependency depends the prior mentioned component or something (in an nth removed sense) that depends on the prior mentioned component (something it shouldn't depend on), and if it does, enter the if statment and return false
                return false;
            }
        }
    }
    return true; // if nothing goes wrong for any of the primaryDependencies, return true
}

// console.log(validateDependencies([["A","B"],["B","C"],["C","E"],["G","H"],["E","R"],["E","A"]]))

module.exports = validateDependencies;